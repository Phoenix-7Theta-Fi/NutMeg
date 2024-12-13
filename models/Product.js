const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['herbs', 'supplements', 'oils', 'teas', 'wellness']
  },
  image: {
    type: String,
    required: true
  },
  benefits: [{
    type: String
  }],
  ingredients: [{
    type: String
  }],
  dosage: {
    type: String
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
