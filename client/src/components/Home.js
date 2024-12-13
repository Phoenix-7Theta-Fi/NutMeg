import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to NutMeg</h1>
        <p>Your trusted source for Ayurvedic wisdom and holistic wellness</p>
      </section>
      
      <section className="features">
        <div className="feature-cards">
          <div className="feature-card">
            <h2>Expert Practitioners</h2>
            <p>Connect with experienced Ayurvedic doctors and specialists</p>
            <Link to="/practitioners" className="cta-button">Meet Our Practitioners</Link>
          </div>
          
          <div className="feature-card">
            <h2>Wellness Blog</h2>
            <p>Discover insights and tips for natural healing and balanced living</p>
            <Link to="/blog" className="cta-button">Read Our Blog</Link>
          </div>

          <div className="feature-card">
            <h2>Ayurvedic Products</h2>
            <p>Shop our curated collection of authentic Ayurvedic products</p>
            <Link to="/products" className="cta-button">Visit Shop</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
