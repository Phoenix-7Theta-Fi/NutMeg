require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const { generateEmbedding } = require('../services/embeddingService');

const samplePosts = [
  {
    title: "Understanding the Three Doshas: Vata, Pitta, and Kapha",
    content: `The three doshas—Vata, Pitta, and Kapha—are the primary energies in Ayurvedic medicine. Each dosha represents different elements and qualities:

Vata (Air & Space): Governs movement and change. People with dominant Vata tend to be creative, quick-thinking, and naturally slim.

Pitta (Fire & Water): Controls digestion and metabolism. Pitta-dominant individuals are often intelligent, focused, and natural leaders.

Kapha (Earth & Water): Maintains structure and lubrication. Kapha types are typically calm, strong, and nurturing.

Understanding your dominant dosha helps in maintaining balance through diet, lifestyle, and remedies.`,
    author: "Dr. Deepak Sharma"
  },
  {
    title: "Ayurvedic Daily Routine (Dinacharya)",
    content: `Dinacharya is the Ayurvedic practice of daily routine that aligns with natural cycles. Key practices include:

1. Wake up before sunrise (Brahma Muhurta)
2. Tongue scraping and oil pulling
3. Self-massage (Abhyanga) with warm oil
4. Yoga and meditation
5. Eating main meal at midday
6. Early, light dinner
7. Sleep by 10 PM

Following these practices helps maintain dosha balance and promotes overall health.`,
    author: "Dr. Maya Patel"
  },
  {
    title: "Healing Properties of Common Ayurvedic Herbs",
    content: `Ayurvedic herbs are powerful healing agents. Here are some essential herbs:

Turmeric (Haldi): Anti-inflammatory, immune booster
Ashwagandha: Adaptogen, stress relief
Triphala: Digestive health, detoxification
Holy Basil (Tulsi): Respiratory health, anxiety relief
Brahmi: Cognitive function, memory enhancement
Ginger: Digestion, circulation, inflammation

These herbs should be used under proper guidance based on your dosha type.`,
    author: "Dr. Rajesh Kumar"
  },
  {
    title: "Seasonal Wellness: Ayurvedic Guide to Ritucharya",
    content: `Ritucharya is the practice of adapting your lifestyle and diet according to seasons. Each season affects doshas differently:

Spring (Vasanta): Kapha-aggravating season. Focus on light, warm foods and exercise.
Summer (Grishma): Pitta-dominant. Favor cooling foods and moderate activity.
Monsoon (Varsha): Vata increases. Emphasize cooked, warm, and easily digestible foods.
Autumn (Sharad): Pitta pacifying. Perfect for gentle detoxification.
Winter (Hemanta): Vata season. Focus on nourishing, warm foods and oil massage.

Adjusting your routine seasonally maintains optimal health and prevents seasonal imbalances.`,
    author: "Dr. Anjali Desai"
  },
  {
    title: "Ayurvedic Approach to Mental Health",
    content: `Ayurveda views mental health as intrinsically connected to physical well-being. Key principles include:

1. Meditation (Dhyana): Balances all doshas, particularly beneficial for Vata-related anxiety
2. Pranayama: Breathing exercises to calm the mind
3. Herbs for Mental Clarity:
   - Brahmi: Enhances memory and concentration
   - Shankhpushpi: Natural tranquilizer
   - Jatamansi: Promotes quality sleep

4. Daily Practices:
   - Regular oil massage to ground Vata
   - Consistent sleep schedule
   - Mindful eating practices

Mental health is viewed as a state of balance between mind, body, and consciousness.`,
    author: "Dr. Priya Verma"
  },
  {
    title: "Understanding Agni: The Digestive Fire",
    content: `Agni is the cornerstone of Ayurvedic health. It represents our digestive capacity and metabolism. Types of Agni:

1. Sama Agni: Balanced digestion
2. Vishama Agni: Variable digestion (Vata imbalance)
3. Tikshna Agni: Sharp digestion (Pitta imbalance)
4. Manda Agni: Slow digestion (Kapha imbalance)

Maintaining healthy Agni:
- Eat only when hungry
- Practice mindful eating
- Avoid ice-cold beverages
- Include digestive spices
- Follow proper food combinations

Strong Agni is essential for proper nutrition and elimination of toxins.`,
    author: "Dr. Amit Trivedi"
  },
  {
    title: "Panchakarma: Deep Cleansing and Rejuvenation",
    content: `Panchakarma is Ayurveda's premier mind-body healing experience for detoxifying and rejuvenating. The five main procedures are:

1. Vamana: Therapeutic emesis for Kapha conditions
2. Virechana: Purgation therapy for Pitta imbalances
3. Basti: Therapeutic enema for Vata disorders
4. Nasya: Nasal administration of medicines
5. Raktamokshana: Blood purification

Pre-Panchakarma preparation (Purvakarma):
- Snehana (Oil therapy)
- Swedana (Sweating therapy)

Post-Panchakarma care (Paschatkarma) is crucial for maintaining benefits.`,
    author: "Dr. Sanjay Mishra"
  },
  {
    title: "Ayurvedic Management of Skin Health",
    content: `Skin health in Ayurveda is tied to dosha balance and proper digestion. Common skin issues and their management:

Vata Skin:
- Dry, thin, easily dehydrated
- Treatment: Oil massage, hydrating foods

Pitta Skin:
- Sensitive, prone to inflammation
- Treatment: Cooling herbs, blood-purifying foods

Kapha Skin:
- Oily, prone to congestion
- Treatment: Dry brushing, detoxifying herbs

General skin care principles:
1. Regular oleation
2. Proper hydration
3. Blood-purifying herbs
4. Dosha-specific diet
5. Stress management`,
    author: "Dr. Meena Sharma"
  },
  {
    title: "The Science of Rasayana: Ayurvedic Rejuvenation",
    content: `Rasayana therapy is Ayurveda's comprehensive approach to rejuvenation and longevity. Key aspects include:

Herbs and Formulations:
- Chyawanprash: Classic rejuvenative
- Amalaki: Premier anti-aging herb
- Guduchi: Immune enhancer

Lifestyle Practices:
1. Proper sleep hygiene
2. Regular exercise
3. Meditation
4. Social harmony

Rasayana benefits:
- Enhanced immunity
- Improved mental function
- Better digestion
- Increased vitality
- Delayed aging process`,
    author: "Dr. Vikram Chauhan"
  },
  {
    title: "Ayurvedic Principles of Food Combining",
    content: `Proper food combining (Virudh Ahara) is essential for optimal digestion and nutrition. Key principles:

Compatible Combinations:
- Grains with vegetables
- Proteins with green vegetables
- Fruits eaten alone

Incompatible Combinations:
- Milk with salty or sour foods
- Melons with other fruits
- Heavy proteins with starches

Timing Considerations:
- Wait 3 hours between meals
- Fruits best consumed alone
- Heavy foods earlier in day

These principles support Agni and prevent the formation of Ama (toxins).`,
    author: "Dr. Rohit Agarwal"
  }
];

async function seedPosts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Add embeddings to posts
    for (const post of samplePosts) {
      const textToEmbed = `${post.title}\n${post.content}`;
      console.log(`Generating embedding for post: ${post.title}`);
      const embedding = await generateEmbedding(textToEmbed);
      
      const newPost = new Post({
        ...post,
        embedding
      });
      
      await newPost.save();
      console.log(`Saved post: ${post.title}`);
    }

    console.log('Successfully seeded posts with embeddings');
  } catch (error) {
    console.error('Error seeding posts:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedPosts();
