import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AyurvedicChatbot.css';

const AyurvedicChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e, suggestedQuestion = null) => {
    e?.preventDefault();
    const questionText = suggestedQuestion || input;
    if (!questionText.trim()) return;

    const userMessage = {
      type: 'user',
      content: questionText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot/ask', {
        query: questionText
      });

      console.log('Raw server response:', response.data);
      const { text, sources } = response.data;

      // Handle different response formats
      let finalText;
      try {
        if (text && typeof text === 'object') {
          // If it's an object with a response property
          if (text.response) {
            finalText = text.response;
          } 
          // If it has a text property
          else if (text.text) {
            finalText = text.text;
          }
          // Try to stringify the object
          else {
            finalText = JSON.stringify(text);
          }
        } else if (typeof text === 'string') {
          finalText = text;
        } else if (text && typeof text.toString === 'function') {
          finalText = text.toString();
        } else {
          throw new Error('Unable to extract text from response');
        }
      } catch (error) {
        console.error('Error processing response:', error);
        throw new Error('Failed to process server response');
      }

      if (!finalText) {
        throw new Error('No text content in response');
      }

      const botMessage = {
        type: 'bot',
        content: finalText,
        sources: Array.isArray(sources) ? sources : []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setError('Sorry, I encountered an error. Please try again.');
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (text, sources = []) => {
    if (!text) return null;

    // Split the text into content and sources sections
    const [content, sourcesText] = text.split('\nSources:');

    // Format the content section with clickable citations
    const contentHtml = content.split('\n').map((line, i) => {
      // Replace citations [n] with clickable links
      const formattedLine = line.replace(/\[(\d+)\]/g, (match, num) => {
        const source = sources.find(s => s.number === parseInt(num));
        if (source) {
          return `<Link to="/blog/${source.id}" class="citation-link">[${num}]</Link>`;
        }
        return match;
      });

      return (
        <div key={`content-${i}`} className="content-line"
             dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });

    // Format the sources section
    const sourcesSection = sources?.length > 0 && (
      <div className="sources-section">
        <div className="sources-header">Sources:</div>
        {sources.map(source => (
          <div key={`source-${source.number}`} className="source-line">
            <Link to={`/blog/${source.id}`} className="source-link">
              {source.number}. {source.title}
              {source.author && <span className="source-author"> by {source.author}</span>}
            </Link>
          </div>
        ))}
      </div>
    );

    return (
      <div className="message-content">
        <div className="content-section">
          {contentHtml}
        </div>
        {sourcesSection}
      </div>
    );
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Ayurvedic Assistant</h3>
        <p>Your guide to Ayurvedic wisdom</p>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === 'bot' ? (
              formatMessage(message.content, message.sources)
            ) : (
              <div className="message-content">{message.content}</div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Ayurvedic practices and remedies..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AyurvedicChatbot;
