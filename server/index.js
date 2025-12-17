const express = require('express');
const cors = require('cors');
const { getDb, state } = require('./db');
const quotesRoutes = require('./routes/quotes');
const interactionsRoutes = require('./routes/interactions');
const categoriesRoutes = require('./routes/categories');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount Routes
app.use('/api/quotes', quotesRoutes);
app.use('/api/interactions', interactionsRoutes);
app.use('/api/categories', categoriesRoutes);

async function startServer() {
    try {
        const db = await getDb();
        console.log('Database initialized.');

        if (state.isInMemory) {
            console.log('Running in-memory setup...');
            const setup = require('./setup');
            await setup.run(db);
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

if (require.main === module) {
    startServer();
}

module.exports = app;
