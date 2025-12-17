const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.get('/', async (req, res) => {
    try {
        const db = await getDb();

        // Fetch categories and subcategories
        // We can do this in one query or two. Two is cleaner.
        const catRes = await db.query('SELECT * FROM categories ORDER BY id');
        const subRes = await db.query('SELECT * FROM subcategories ORDER BY id');

        const categories = catRes.rows.map(cat => {
            return {
                ...cat,
                subcategories: subRes.rows.filter(s => s.category_id === cat.id)
            };
        });

        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
