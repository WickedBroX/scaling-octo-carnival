const fs = require('fs');
const path = require('path');
const { categories, subcategories, quotes } = require('./seed');

module.exports = {
    run: async (pool) => {
        console.log('Running setup...');

        // 1. Run Schema
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        // Better splitting: remove comments, split by semicolon, trim
        const statements = schemaSql
            .replace(/--.*$/gm, '') // Remove comments
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const stmt of statements) {
            try {
                await pool.query(stmt);
            } catch (e) {
                console.error('Error running schema statement:', stmt);
                throw e;
            }
        }
        console.log('Schema applied.');

        // 2. Seed Categories
        const categoryMap = new Map(); // Name -> ID

        for (const cat of categories) {
            const res = await pool.query(
                'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
                [cat.name, cat.description]
            );
            categoryMap.set(cat.name, res.rows[0].id);
        }
        console.log(`Seeded ${categories.length} categories.`);

        // 3. Seed Subcategories
        const subcategoryMap = new Map(); // Name -> ID

        for (const sub of subcategories) {
            const catId = categoryMap.get(sub.category);
            if (!catId) {
                console.error(`Category not found for subcategory: ${sub.name}`);
                continue;
            }

            const res = await pool.query(
                'INSERT INTO subcategories (category_id, name, tags) VALUES ($1, $2, $3) RETURNING id',
                [catId, sub.name, sub.tags]
            );
            subcategoryMap.set(sub.name, res.rows[0].id);
        }
        console.log(`Seeded ${subcategories.length} subcategories.`);

        // 4. Seed Quotes
        for (const q of quotes) {
            const subId = subcategoryMap.get(q.subcategory);
            if (!subId) {
                console.error(`Subcategory not found for quote: "${q.text}" (${q.subcategory})`);
                continue;
            }

            await pool.query(
                'INSERT INTO quotes (text, author, subcategory_id) VALUES ($1, $2, $3)',
                [q.text, q.author, subId]
            );
        }
        console.log(`Seeded ${quotes.length} quotes.`);
    }
};
