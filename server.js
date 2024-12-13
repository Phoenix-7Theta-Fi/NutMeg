const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const practitionersRouter = require('./routes/practitioners');
const chatRoutes = require('./routes/chat');
const productsRouter = require('./routes/products');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('MongoDB URI:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const connection = mongoose.connection;
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('MongoDB database connection established successfully');
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    const productsCount = await mongoose.connection.db.collection('products').countDocuments();
    console.log('Number of products in database:', productsCount);
  } catch (error) {
    console.error('Error checking collections:', error);
  }
});

// Routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/posts', postsRouter);
app.use('/api/practitioners', practitionersRouter);
app.use('/api/chatbot', chatRoutes);
app.use('/api/products', productsRouter);
app.use('/api/appointments', require('./routes/appointments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
