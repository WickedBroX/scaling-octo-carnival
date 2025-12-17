const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// Helper to calculate category weights
async function getUserCategoryWeights(db, userId) {
    if (!userId) return {};

    // Get recent interactions (e.g., last 100)
    // Weight: Like=3, Remix=5, View=1, Share=4
    const result = await db.query(`
        SELECT
            c.id as category_id,
            ui.interaction_type
        FROM user_interactions ui
        JOIN quotes q ON ui.quote_id = q.id
        JOIN subcategories s ON q.subcategory_id = s.id
        JOIN categories c ON s.category_id = c.id
        WHERE ui.user_id = $1
        ORDER BY ui.created_at DESC
        LIMIT 100
    `, [userId]);

    const weights = {};
    const points = { view: 1, like: 3, share: 4, remix: 5 };

    for (const row of result.rows) {
        const catId = row.category_id;
        const score = points[row.interaction_type] || 1;
        weights[catId] = (weights[catId] || 0) + score;
    }
    return weights;
}

// GET /api/timeline
router.get('/timeline', async (req, res) => {
    try {
        const userId = req.query.userId;
        const db = await getDb();

        let preferredCategoryIds = [];

        if (userId) {
            const weights = await getUserCategoryWeights(db, userId);
            // Sort categories by weight descending
            preferredCategoryIds = Object.entries(weights)
                .sort(([, a], [, b]) => b - a)
                .map(([id]) => parseInt(id));
        }

        let quotes = [];

        if (preferredCategoryIds.length > 0) {
            // Get from preferred
            // pg-mem might be strict about array parameter types.
            // Let's manually expand the IDs or use IN clause with dynamic parameters
            // to avoid "cannot cast text to integer" if $1 is passed as string array?
            // Actually, ANY($1) expects an array.

            // Safer way for ANY($1): Ensure it's passed as an integer array

            // Debugging showed "cannot cast text to integer". This likely happens comparing c.id (int) to ANY($1).
            // If the driver sends $1 as string array, pg-mem might fail.
            // Let's construct the IN clause manually for safety in this environment.

            const ids = preferredCategoryIds.join(',');

            const preferredRes = await db.query(`
                SELECT q.*, s.name as subcategory_name, c.name as category_name
                FROM quotes q
                JOIN subcategories s ON q.subcategory_id = s.id
                JOIN categories c ON s.category_id = c.id
                WHERE c.id IN (${ids})
                ORDER BY RANDOM()
                LIMIT 14
            `);

            // Get from others (discovery)
            const otherRes = await db.query(`
                SELECT q.*, s.name as subcategory_name, c.name as category_name
                FROM quotes q
                JOIN subcategories s ON q.subcategory_id = s.id
                JOIN categories c ON s.category_id = c.id
                WHERE c.id NOT IN (${ids})
                ORDER BY RANDOM()
                LIMIT 6
            `);

            quotes = [...preferredRes.rows, ...otherRes.rows];

            // Shuffle the combined result
            quotes.sort(() => Math.random() - 0.5);

        } else {
            // No history, purely random
            const resAll = await db.query(`
                SELECT q.*, s.name as subcategory_name, c.name as category_name
                FROM quotes q
                JOIN subcategories s ON q.subcategory_id = s.id
                JOIN categories c ON s.category_id = c.id
                ORDER BY RANDOM()
                LIMIT 20
            `);
            quotes = resAll.rows;
        }

        res.json(quotes);

    } catch (err) {
        console.error('Error fetching timeline:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/discovery
// Returns a grid-friendly diverse set
router.get('/discovery', async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.query(`
            SELECT q.*, s.name as subcategory_name, c.name as category_name
            FROM quotes q
            JOIN subcategories s ON q.subcategory_id = s.id
            JOIN categories c ON s.category_id = c.id
            ORDER BY RANDOM()
            LIMIT 30
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching discovery:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/quotes/search
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json([]);
        }

        const db = await getDb();
        // Simple case-insensitive search
        // pg-mem supports ILIKE? Yes, usually.
        // We search in Quote Text, Author, Subcategory Name, Category Name
        const searchTerm = `%${q}%`;

        const result = await db.query(`
            SELECT q.*, s.name as subcategory_name, c.name as category_name
            FROM quotes q
            JOIN subcategories s ON q.subcategory_id = s.id
            JOIN categories c ON s.category_id = c.id
            WHERE
                q.text ILIKE $1 OR
                q.author ILIKE $1 OR
                s.name ILIKE $1 OR
                c.name ILIKE $1
            LIMIT 50
        `, [searchTerm]);

        res.json(result.rows);
    } catch (err) {
        console.error('Error searching quotes:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
