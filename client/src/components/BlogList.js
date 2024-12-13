import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="blog-container">
      <h1>Ayurvedic Wellness Blog</h1>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <Link to={`/blog/${post._id}`}>
              <h2>{post.title}</h2>
            </Link>
            <div className="post-meta">
              <Link to={`/author/${encodeURIComponent(post.author)}`} className="author-link">
                By {post.author}
              </Link>
              <span className="date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="post-excerpt">
              {post.content.substring(0, 200)}...
            </p>
            <Link to={`/blog/${post._id}`} className="read-more">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
