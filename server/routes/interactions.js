const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

// Record an interaction
router.post('/', async (req, res) => {
    try {
        const { userId, quoteId, interactionType } = req.body;

        if (!userId || !quoteId || !interactionType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = await getDb();

        // Ensure user exists (upsert logic basically)
        // Since we generate UUIDs on client, we need to make sure this user is in the DB before adding interaction
        // pg-mem might not support ON CONFLICT easily in all versions, but let's try standard INSERT IGNORE equivalent

        const checkUser = await db.query('SELECT id FROM users WHERE id = $1', [userId]);
        if (checkUser.rowCount === 0) {
            await db.query('INSERT INTO users (id, email) VALUES ($1, $2)', [userId, null]);
        }

        await db.query(
            'INSERT INTO user_interactions (user_id, quote_id, interaction_type) VALUES ($1, $2, $3)',
            [userId, quoteId, interactionType]
        );

        res.json({ success: true });
    } catch (err) {
        console.error('Error recording interaction:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
