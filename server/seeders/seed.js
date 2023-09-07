const db = require('../config/connection');
const Product = require('../models/Product');
const productSeeds = require('../seeders/productSeeds.json');

db.once('open', async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(productSeeds);
        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});