const express = require('express');
const router = express.Router();
const { generateAyurvedicResponse } = require('../services/geminiService');

router.post('/ask', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    const { query } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query must be a non-empty string' });
    }

    const response = await generateAyurvedicResponse(query);
    console.log('Generated response from Gemini:', response);

    if (!response) {
      throw new Error('No response from Gemini service');
    }

    // Ensure text is a string
    let finalText;
    try {
      if (response.text && typeof response.text === 'object') {
        if (response.text.response) {
          finalText = response.text.response;
        } else if (response.text.text) {
          finalText = response.text.text;
        } else {
          finalText = JSON.stringify(response.text);
        }
      } else if (typeof response.text === 'string') {
        finalText = response.text;
      } else if (response.text && typeof response.text.toString === 'function') {
        finalText = response.text.toString();
      } else {
        throw new Error('Unable to extract text from response');
      }
    } catch (error) {
      console.error('Error processing response:', error);
      throw new Error('Failed to process Gemini response');
    }

    if (!finalText) {
      throw new Error('No text content in response');
    }

    // Send the response with proper error handling
    res.json({
      text: finalText,
      sources: Array.isArray(response.sources) ? response.sources : []
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

module.exports = router;
