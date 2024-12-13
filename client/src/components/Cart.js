import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
              onError={(e) => {
                e.target.src = '/images/product-placeholder.jpg';
              }}
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
