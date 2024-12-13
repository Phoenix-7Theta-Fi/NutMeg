const { GoogleGenerativeAI } = require("@google/generative-ai");
const Post = require('../models/Post');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

async function generateEmbedding(text) {
  try {
    console.log('Generating embedding for text:', text.substring(0, 100) + '...');
    const result = await embeddingModel.embedContent(text);
    const embedding = result.embedding.values;
    console.log('Generated embedding with dimensions:', embedding.length);
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

async function findSimilarPosts(queryEmbedding, limit = 3) {
  try {
    console.log('Finding similar posts...');
    
    // First, let's verify our posts in MongoDB
    const allPosts = await Post.find({});
    console.log('Total posts in database:', allPosts.length);
    
    if (allPosts.length === 0) {
      console.log('No posts found in database');
      return [];
    }

    // Calculate cosine similarity between query and each post
    const postsWithScores = await Promise.all(allPosts.map(async (post) => {
      if (!post.embedding || post.embedding.length === 0) {
        console.log(`Post ${post._id} has no embedding, generating one...`);
        post.embedding = await generateEmbedding(`${post.title}\n${post.content}`);
        await post.save();
      }
      
      const similarity = cosineSimilarity(queryEmbedding, post.embedding);
      return { ...post.toObject(), score: similarity };
    }));

    // Sort by similarity score
    const sortedPosts = postsWithScores.sort((a, b) => b.score - a.score);
    
    // Return top matches
    return sortedPosts.slice(0, limit);
  } catch (error) {
    console.error('Error in findSimilarPosts:', error);
    console.error('Full error details:', error);
    return [];
  }
}

// Helper function to calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

module.exports = {
  generateEmbedding,
  findSimilarPosts
};
