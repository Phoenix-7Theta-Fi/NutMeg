const mongoose = require('mongoose');
const Post = require('../models/Post');
require('dotenv').config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Create test posts
    const posts = [
      {
        title: "Understanding the Three Doshas: Vata, Pitta, and Kapha",
        content: `The three doshas - Vata, Pitta, and Kapha - are the primary energies in Ayurvedic medicine. 
                 Vata governs movement and change in the body, including blood circulation, breathing, and nerve impulses. 
                 Pitta controls digestion, metabolism, and energy production.
                 Kapha maintains structure, provides lubrication, and supports the immune system.`,
        author: "Dr. Ayurveda",
        tags: ["doshas", "vata", "pitta", "kapha", "fundamentals"]
      },
      {
        title: "Daily Ayurvedic Practices for Better Health",
        content: `Ayurveda recommends several daily practices for maintaining optimal health.
                 These include waking up early, oil pulling, tongue scraping, and following a proper diet.
                 Each practice is designed to balance the doshas and promote overall wellness.`,
        author: "Dr. Ayurveda",
        tags: ["daily routine", "practices", "health", "wellness"]
      }
    ];

    // Insert posts
    const savedPosts = await Post.insertMany(posts);
    console.log('Added test posts:', savedPosts);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedDatabase();
