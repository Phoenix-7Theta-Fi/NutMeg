const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Practitioner = require('../models/Practitioner');
const { generateEmbedding } = require('../services/embeddingService');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    // Verify that the author exists as a practitioner
    const practitioner = await Practitioner.findOne({ name: req.body.author });
    if (!practitioner) {
      return res.status(400).json({ message: 'Author must be a valid practitioner' });
    }

    // Generate embedding for the post content
    const combinedText = `${req.body.title} ${req.body.content}`;
    const embedding = await generateEmbedding(combinedText);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: practitioner.name, // Use the exact name from the practitioner record
      tags: req.body.tags,
      embedding: embedding
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    if (req.body.author) {
      // Verify that the author exists as a practitioner if author is being updated
      const practitioner = await Practitioner.findOne({ name: req.body.author });
      if (!practitioner) {
        return res.status(400).json({ message: 'Author must be a valid practitioner' });
      }
      req.body.author = practitioner.name; // Use the exact name from the practitioner record
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Generate new embedding if content changed
    let embedding = post.embedding;
    if (req.body.title || req.body.content) {
      const combinedText = `${req.body.title || post.title} ${req.body.content || post.content}`;
      embedding = await generateEmbedding(combinedText);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || post.title,
        content: req.body.content || post.content,
        author: req.body.author || post.author,
        tags: req.body.tags || post.tags,
        embedding: embedding
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search posts by tag
router.get('/tags/:tag', async (req, res) => {
  try {
    const posts = await Post.find({ 
      tags: { $in: [req.params.tag] } 
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get posts by author
router.get('/author/:authorName', async (req, res) => {
  try {
    const authorPosts = await Post.find({ 
      author: decodeURIComponent(req.params.authorName) 
    }).sort({ createdAt: -1 });
    
    res.json(authorPosts);
  } catch (error) {
    console.error('Error fetching author posts:', error);
    res.status(500).json({ message: 'Error fetching author posts' });
  }
});

module.exports = router;
