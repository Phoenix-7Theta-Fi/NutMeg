const express = require('express');
const router = express.Router();
const { generateAyurvedicResponse } = require('../services/geminiService');
const { generateEmbedding, findSimilarPosts } = require('../services/embeddingService');

// Get chatbot response
router.post('/ask', async (req, res) => {
  console.log('Received chatbot request:', req.body);
  const { message } = req.body;

  if (!message) {
    console.error('No message provided in request');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    console.log('Generating embedding for user query...');
    const queryEmbedding = await generateEmbedding(message);
    console.log('Generated embedding successfully');

    console.log('Finding relevant posts...');
    const relevantPosts = await findSimilarPosts(queryEmbedding);
    console.log('Found relevant posts:', relevantPosts.length);

    // Prepare context from relevant posts with clear author attribution
    let context = '';
    if (relevantPosts && relevantPosts.length > 0) {
      context = relevantPosts.map(post => `
Blog Post by ${post.author}:
Title: ${post.title}
Content: ${post.content}
---`).join('\n\n');
      console.log('Built context from posts with author attribution');
    } else {
      console.log('No relevant posts found for context');
    }

    // Generate response with context
    console.log('Generating Ayurvedic response...');
    const response = await generateAyurvedicResponse(message, context);
    console.log('Generated response successfully');

    // Format citations
    const citations = relevantPosts.map(post => ({
      title: post.title,
      author: post.author,
      score: post.score || 0
    }));

    return res.json({
      message: response,
      citations: citations
    });

  } catch (error) {
    console.error('Error in chatbot route:', error);
    
    // Send a more detailed error response
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
      step: error.step || 'unknown'
    });
  }
});

module.exports = router;
