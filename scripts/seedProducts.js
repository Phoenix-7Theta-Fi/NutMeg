require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: "Ashwagandha Root Powder",
    description: "Organic Ashwagandha root powder known for its stress-relieving and adaptogenic properties.",
    price: 24.99,
    category: "herbs",
    image: "/images/products/ashwagandha.jpg",
    benefits: ["Reduces stress and anxiety", "Improves sleep quality", "Boosts immunity"],
    ingredients: ["Organic Ashwagandha root powder"],
    dosage: "1/2 teaspoon twice daily with warm milk or water",
    stock: 100
  },
  {
    name: "Triphala Supplement",
    description: "Traditional Ayurvedic formula for digestive health and detoxification.",
    price: 19.99,
    category: "supplements",
    image: "/images/products/triphala.jpg",
    benefits: ["Supports digestion", "Natural detoxification", "Improves metabolism"],
    ingredients: ["Amalaki", "Bibhitaki", "Haritaki"],
    dosage: "2 capsules before bedtime",
    stock: 150
  },
  {
    name: "Brahmi Brain Boost Tea",
    description: "Herbal tea blend for mental clarity and cognitive function.",
    price: 15.99,
    category: "teas",
    image: "/images/products/brahmi-tea.jpg",
    benefits: ["Enhances memory", "Improves focus", "Reduces mental fatigue"],
    ingredients: ["Brahmi leaves", "Tulsi", "Green tea"],
    dosage: "1 tea bag per cup, steep for 5 minutes",
    stock: 200
  },
  {
    name: "Ayurvedic Massage Oil",
    description: "Warming massage oil blend with traditional herbs.",
    price: 29.99,
    category: "oils",
    image: "/images/products/massage-oil.jpg",
    benefits: ["Relieves muscle tension", "Improves circulation", "Nourishes skin"],
    ingredients: ["Sesame oil", "Eucalyptus oil", "Camphor"],
    dosage: "Apply as needed for massage",
    stock: 75
  },
  {
    name: "Turmeric Curcumin Complex",
    description: "High-potency turmeric supplement with enhanced absorption.",
    price: 34.99,
    category: "supplements",
    image: "/images/products/turmeric.jpg",
    benefits: ["Anti-inflammatory", "Joint health", "Antioxidant support"],
    ingredients: ["Turmeric extract", "Black pepper extract", "Ginger"],
    dosage: "1 capsule twice daily with meals",
    stock: 120
  },
  {
    name: "Stress Relief Tea Blend",
    description: "Calming herbal tea blend for relaxation and stress relief.",
    price: 16.99,
    category: "teas",
    image: "/images/products/stress-tea.jpg",
    benefits: ["Reduces anxiety", "Promotes relaxation", "Improves sleep"],
    ingredients: ["Chamomile", "Lavender", "Holy Basil"],
    dosage: "1 tea bag per cup, steep for 7 minutes",
    stock: 180
  },
  {
    name: "Neem Purifying Face Oil",
    description: "Natural face oil for clear and healthy skin.",
    price: 27.99,
    category: "oils",
    image: "/images/products/neem-oil.jpg",
    benefits: ["Clears skin", "Reduces acne", "Natural antibacterial"],
    ingredients: ["Neem oil", "Jojoba oil", "Tea tree oil"],
    dosage: "Apply 2-3 drops to clean skin",
    stock: 90
  },
  {
    name: "Digestive Wellness Kit",
    description: "Complete kit for digestive health and comfort.",
    price: 49.99,
    category: "wellness",
    image: "/images/products/digestive-kit.jpg",
    benefits: ["Improves digestion", "Reduces bloating", "Supports gut health"],
    ingredients: ["Triphala", "Ginger", "Fennel"],
    dosage: "Follow individual product instructions",
    stock: 50
  },
  {
    name: "Joint Support Formula",
    description: "Herbal blend for joint health and flexibility.",
    price: 39.99,
    category: "supplements",
    image: "/images/products/joint-support.jpg",
    benefits: ["Reduces joint pain", "Improves flexibility", "Anti-inflammatory"],
    ingredients: ["Boswellia", "Guggul", "Turmeric"],
    dosage: "2 capsules daily with meals",
    stock: 85
  },
  {
    name: "Sleep & Relaxation Bundle",
    description: "Complete bundle for better sleep and relaxation.",
    price: 59.99,
    category: "wellness",
    image: "/images/products/sleep-bundle.jpg",
    benefits: ["Improves sleep quality", "Reduces stress", "Promotes relaxation"],
    ingredients: ["Ashwagandha", "Chamomile tea", "Lavender oil"],
    dosage: "Follow individual product instructions",
    stock: 40
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log('Added products:', insertedProducts.length);

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
