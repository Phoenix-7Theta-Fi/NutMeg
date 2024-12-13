const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generateEmbedding, findSimilarPosts } = require('./embeddingService');
require('dotenv').config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is required');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAyurvedicResponse(userQuery) {
  try {
    console.log('Finding relevant posts for query:', userQuery);
    const queryEmbedding = await generateEmbedding(userQuery);
    
    if (!queryEmbedding) {
      throw new Error('Failed to generate embedding for query');
    }

    const relevantPosts = await findSimilarPosts(queryEmbedding);
    console.log('Found relevant posts:', relevantPosts);

    // If no relevant posts found, provide a generic response
    if (!relevantPosts || relevantPosts.length === 0) {
      return {
        text: "I apologize, but I don't have enough information in my database to answer your question accurately. Please try asking a different question or check back later when more content has been added.",
        sources: []
      };
    }

    // Format context from relevant posts
    const context = relevantPosts.map((post, index) => 
      `Post ${index + 1}: "${post.title}"\nContent: ${post.content}\n`
    ).join('\n');

    const prompt = `You are an Ayurvedic expert assistant. Answer the following question using the information from the provided blog posts.

IMPORTANT FORMATTING INSTRUCTIONS:
1. Use numerical citations in square brackets [1], [2], etc. immediately after each piece of information
2. Each citation must correspond to a source number in the Sources section
3. Keep citations within the same sentence as the information they support
4. At the end, add a "Sources:" section listing all referenced posts
5. Format each source exactly as: "1. Title of Post"
6. Keep your response concise and focused
7. Do not include any URLs or links in your response

Context from blog posts:
${context}

Question: ${userQuery}

Remember to include a Sources section at the end with numbered references that match your citations.`;

    console.log('Sending prompt to Gemini');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Extract text from response
    let responseText;
    try {
      if (response && typeof response === 'object') {
        // Try to get the response text directly
        responseText = response.response || response.text;
        
        // If it's a function, call it
        if (typeof responseText === 'function') {
          responseText = responseText();
        }
        
        // If still not a string, try to get it from candidates
        if (!responseText && response.candidates && response.candidates[0]) {
          responseText = response.candidates[0].content?.text;
        }
        
        // If still not a string, try JSON stringify
        if (responseText && typeof responseText === 'object') {
          responseText = JSON.stringify(responseText);
        }
      }
    } catch (error) {
      console.error('Error extracting text from response:', error);
      throw new Error('Failed to extract text from Gemini response');
    }

    if (!responseText || typeof responseText !== 'string') {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format from Gemini API');
    }

    console.log('Extracted response text:', responseText);

    // Ensure there's a Sources section and it matches the citations
    let finalText = responseText;
    if (!finalText.includes('Sources:')) {
      const sourcesSection = '\n\nSources:\n' + relevantPosts.map((post, index) => 
        `${index + 1}. ${post.title}`
      ).join('\n');
      finalText += sourcesSection;
    }

    // Extract sources and format them with post IDs
    const sources = relevantPosts.map((post, index) => ({
      number: index + 1,
      title: post.title,
      id: post._id.toString(),
      author: post.author
    }));

    const finalResponse = { 
      text: finalText, 
      sources 
    };
    console.log('Final formatted response:', finalResponse);
    return finalResponse;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

module.exports = {
  generateAyurvedicResponse
};
