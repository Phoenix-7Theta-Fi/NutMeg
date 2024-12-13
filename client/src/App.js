import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './components/Home';
import PractitionersList from './components/PractitionersList';
import PractitionerProfile from './components/PractitionerProfile';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <nav className="navbar">
            <div className="logo">
              <Link to="/">NutMeg</Link>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/practitioners">Practitioners</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/products">Shop</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/chatbot" className="ask-ai-btn">Ask AI Assistant</Link>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/practitioners" element={<PractitionersList />} />
              <Route path="/practitioners/:name" element={<PractitionerProfile />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
