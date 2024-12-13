import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AyurvedicChatbot from './AyurvedicChatbot';
import './Header.css';

const Header = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            NutMeg
          </Link>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/practitioners" className="nav-link">Practitioners</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <button 
              className="chat-button"
              onClick={() => setShowChatbot(true)}
            >
              Ask AI Assistant
            </button>
          </nav>
        </div>
      </header>
      {showChatbot && (
        <AyurvedicChatbot onClose={() => setShowChatbot(false)} />
      )}
    </>
  );
};

export default Header;
