import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = ['all', 'herbs', 'supplements', 'oils', 'teas', 'wellness'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching products...');
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('Products received:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={product.image || '/images/product-placeholder.jpg'}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
              }}
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
