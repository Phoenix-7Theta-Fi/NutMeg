require('dotenv').config();
const mongoose = require('mongoose');

async function checkConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB!');
        
        // Check if we can query the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        const productsCount = await mongoose.connection.db.collection('products').countDocuments();
        console.log('Number of products in database:', productsCount);
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await mongoose.connection.close();
    }
}

checkConnection();
