import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      });
      
      setFormData({ title: '', content: '', author: '', tags: '' });
      if (onPostCreated) {
        onPostCreated(response.data);
      }
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating blog post. Please try again.');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog post content here..."
            rows="10"
          />
        </div>
        <div className="form-group">
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ayurveda, health, wellness"
          />
        </div>
        <button type="submit" className="submit-button">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
