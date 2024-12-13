require('dotenv').config();
const mongoose = require('mongoose');

async function setupVectorIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create vector search index
    const result = await mongoose.connection.db.command({
      createSearchIndex: "posts",
      definition: {
        mappings: {
          dynamic: true,
          fields: {
            embedding: {
              dimensions: 768,
              similarity: "cosine",
              type: "knnVector"
            }
          }
        }
      }
    });

    console.log('Vector search index created:', result);
  } catch (error) {
    console.error('Error setting up vector index:', error);
  } finally {
    await mongoose.disconnect();
  }
}

setupVectorIndex();
