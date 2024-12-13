const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  console.log('GET /api/products - Fetching all products');
  try {
    const products = await Product.find();
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  console.log(`GET /api/products/${req.params.id} - Fetching product by ID`);
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      console.log(`Found product with ID ${req.params.id}`);
      res.json(product);
    } else {
      console.log(`Product with ID ${req.params.id} not found`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  console.log(`GET /api/products/category/${req.params.category} - Fetching products by category`);
  try {
    const products = await Product.find({ category: req.params.category });
    console.log(`Found ${products.length} products in category ${req.params.category}`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
