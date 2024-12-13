import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post');
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <div className="blog-post-loading">Loading...</div>;
  if (error) return <div className="blog-post-error">{error}</div>;
  if (!post) return <div className="blog-post-error">Post not found</div>;

  return (
    <div className="blog-post-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <article className="blog-post">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span className="author">
              By <Link to={`/practitioners/${encodeURIComponent(post.author)}`} className="author-link">{post.author}</Link>
            </span>
            <span className="date">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>
        <div className="blog-post-content">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
