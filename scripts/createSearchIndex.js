require('dotenv').config();
const mongoose = require('mongoose');

async function createSearchIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Drop existing index if any
    try {
      await db.collection('posts').dropIndex('vector_index');
      console.log('Dropped existing vector index');
    } catch (error) {
      console.log('No existing index to drop');
    }

    // Create vector search index using Atlas Search
    const indexJson = {
      "mappings": {
        "dynamic": true,
        "fields": {
          "embedding": {
            "dimensions": 768,
            "similarity": "cosine",
            "type": "knnVector"
          }
        }
      }
    };

    // Create the index
    await db.collection('posts').createIndex(
      { embedding: "vector" },
      {
        name: "vector_index",
        weights: indexJson
      }
    );

    console.log('Vector search index created successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating search index:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createSearchIndex();
