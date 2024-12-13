const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  embedding: {
    type: [Number],
    sparse: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add text index for basic search capability
postSchema.index({ title: 'text', content: 'text' });

// Create an Atlas Search index for vector search
postSchema.index(
  { embedding: "vector" },
  {
    name: "vector_index",
    vectorSearchOptions: {
      numDimensions: 768,
      similarity: "cosine"
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
