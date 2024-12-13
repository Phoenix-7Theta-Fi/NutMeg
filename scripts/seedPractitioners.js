require('dotenv').config();
const mongoose = require('mongoose');
const Practitioner = require('../models/Practitioner');

const practitioners = [
  {
    name: "Dr. Amit Trivedi",
    title: "Chief Ayurvedic Consultant",
    qualifications: ["BAMS", "MD (Ayurveda)", "Ph.D in Ayurvedic Medicine"],
    specializations: ["Respiratory Health", "Immunity Boosting", "Chronic Diseases"],
    experience: 18,
    bio: "Dr. Amit Trivedi is a distinguished Ayurvedic practitioner with over 18 years of experience in treating complex health conditions through holistic Ayurvedic approaches. His innovative treatment protocols combine traditional wisdom with modern medical understanding.",
    clinicLocation: "Ayush Wellness Clinic, 456 Serenity Lane, Delhi",
    consultationHours: "Mon-Fri: 10:00 AM - 6:00 PM",
    profileImage: "/images/practitioners/amit-trivedi.jpg",
    certifications: [
      {
        name: "Gold Medalist in Ayurvedic Medicine",
        year: 2010,
        institution: "National Institute of Ayurveda"
      },
      {
        name: "Excellence in Clinical Practice",
        year: 2016,
        institution: "International Ayurveda Foundation"
      }
    ],
    languages: ["English", "Hindi", "Sanskrit", "Gujarati"],
    socialMedia: {
      website: "www.dramittrivedi.com",
      linkedin: "linkedin.com/in/dr-amit-trivedi",
      twitter: "@DrAmitTrivedi"
    },
    contactEmail: "dr.amit.trivedi@nutmeg.com"
  },
  {
    name: "Dr. Deepak Sharma",
    title: "Senior Ayurvedic Physician",
    qualifications: ["BAMS", "MD (Ayurveda)", "Ph.D in Panchakarma"],
    specializations: ["Panchakarma", "Digestive Disorders", "Stress Management"],
    experience: 15,
    bio: "Dr. Deepak Sharma is a renowned Ayurvedic physician with over 15 years of experience in treating chronic diseases through traditional Ayurvedic methods. His research in Panchakarma therapy has been published in several international journals.",
    clinicLocation: "Wellness Center, 123 Harmony Road, Mumbai",
    consultationHours: "Mon-Sat: 9:00 AM - 5:00 PM",
    profileImage: "/images/practitioners/deepak-sharma.jpg",
    certifications: [
      {
        name: "Advanced Panchakarma Specialist",
        year: 2015,
        institution: "International Academy of Ayurveda"
      },
      {
        name: "Research Excellence in Ayurveda",
        year: 2018,
        institution: "Ministry of AYUSH"
      }
    ],
    languages: ["English", "Hindi", "Sanskrit"],
    socialMedia: {
      website: "www.drsharmaayurveda.com",
      linkedin: "linkedin.com/in/dr-deepak-sharma",
      twitter: "@DrDeepakSharma"
    },
    contactEmail: "dr.deepak.sharma@nutmeg.com"
  },
  {
    name: "Dr. Maya Patel",
    title: "Ayurvedic Women's Health Specialist",
    qualifications: ["BAMS", "MD (Ayurveda)", "Diploma in Women's Health"],
    specializations: ["Women's Health", "Fertility", "Natural Healing"],
    experience: 12,
    bio: "Dr. Maya Patel specializes in women's health and natural healing through Ayurvedic principles. Her integrative approach combines traditional Ayurvedic treatments with modern wellness practices.",
    clinicLocation: "Healing Touch Clinic, 789 Wellness Street, Pune",
    consultationHours: "Tue-Sun: 10:00 AM - 6:00 PM",
    profileImage: "/images/practitioners/maya-patel.jpg",
    certifications: [
      {
        name: "Women's Health Specialist",
        year: 2016,
        institution: "Kerala Ayurveda Academy"
      },
      {
        name: "Natural Fertility Expert",
        year: 2019,
        institution: "International Institute of Ayurveda"
      }
    ],
    languages: ["English", "Hindi", "Gujarati"],
    socialMedia: {
      website: "www.drmayahealing.com",
      linkedin: "linkedin.com/in/dr-maya-patel",
      twitter: "@DrMayaHealing"
    },
    contactEmail: "dr.maya.patel@nutmeg.com"
  },
  {
    name: "Dr. Rajesh Kumar",
    title: "Herbal Medicine Expert",
    qualifications: ["BAMS", "Ph.D in Dravyaguna (Herbal Medicine)"],
    specializations: ["Herbal Medicine", "Chronic Diseases", "Detoxification"],
    experience: 20,
    bio: "Dr. Rajesh Kumar is a leading expert in Ayurvedic herbal medicine with two decades of experience. His research focuses on the therapeutic applications of traditional herbs in modern healthcare.",
    clinicLocation: "Nature Cure Center, 234 Green Avenue, Bangalore",
    consultationHours: "Mon-Sat: 9:00 AM - 7:00 PM",
    profileImage: "/images/practitioners/rajesh-kumar.jpg",
    certifications: [
      {
        name: "Advanced Herbology",
        year: 2012,
        institution: "Rajasthan Ayurveda University"
      },
      {
        name: "Research Excellence in Herbal Medicine",
        year: 2017,
        institution: "Global Ayurveda Foundation"
      }
    ],
    languages: ["English", "Hindi", "Kannada"],
    socialMedia: {
      website: "www.drrajeshherbal.com",
      linkedin: "linkedin.com/in/dr-rajesh-kumar",
      twitter: "@DrRajeshHerbal"
    },
    contactEmail: "dr.rajesh.kumar@nutmeg.com"
  },
  {
    name: "Dr. Anjali Desai",
    title: "Seasonal Wellness Expert",
    qualifications: ["BAMS", "MD (Ayurveda)", "Certification in Climate Medicine"],
    specializations: ["Seasonal Health", "Preventive Care", "Lifestyle Medicine"],
    experience: 14,
    bio: "Dr. Anjali Desai is renowned for her expertise in seasonal wellness and preventive healthcare. She helps patients adapt their lifestyle and diet according to seasonal changes for optimal health.",
    clinicLocation: "Seasons Wellness Center, 567 Harmony Lane, Ahmedabad",
    consultationHours: "Mon-Fri: 9:30 AM - 5:30 PM",
    profileImage: "/images/practitioners/anjali-desai.jpg",
    certifications: [
      {
        name: "Climate Medicine Specialist",
        year: 2018,
        institution: "Global Institute of Ayurveda"
      },
      {
        name: "Lifestyle Medicine Expert",
        year: 2020,
        institution: "American Institute of Ayurveda"
      }
    ],
    languages: ["English", "Hindi", "Gujarati"],
    socialMedia: {
      website: "www.dranjalidesai.com",
      linkedin: "linkedin.com/in/dr-anjali-desai",
      twitter: "@DrAnjaliDesai"
    },
    contactEmail: "dr.anjali.desai@nutmeg.com"
  },
  {
    name: "Dr. Priya Verma",
    title: "Mental Health and Wellness Expert",
    qualifications: ["BAMS", "MD (Ayurvedic Psychology)", "Diploma in Counseling"],
    specializations: ["Mental Health", "Stress Management", "Emotional Wellness"],
    experience: 16,
    bio: "Dr. Priya Verma combines traditional Ayurvedic principles with modern psychology to provide holistic mental health care. She specializes in treating anxiety, depression, and stress-related disorders.",
    clinicLocation: "Mind & Body Wellness Center, 890 Serenity Road, Chennai",
    consultationHours: "Mon-Sat: 10:00 AM - 6:00 PM",
    profileImage: "/images/practitioners/priya-verma.jpg",
    certifications: [
      {
        name: "Ayurvedic Psychology Specialist",
        year: 2014,
        institution: "Institute of Mental Health and Ayurveda"
      },
      {
        name: "Advanced Counseling Certification",
        year: 2017,
        institution: "International Academy of Counseling"
      }
    ],
    languages: ["English", "Hindi", "Tamil"],
    socialMedia: {
      website: "www.drpriyaverma.com",
      linkedin: "linkedin.com/in/dr-priya-verma",
      twitter: "@DrPriyaVerma"
    },
    contactEmail: "dr.priya.verma@nutmeg.com"
  },
  {
    name: "Dr. Sanjay Mishra",
    title: "Panchakarma Specialist",
    qualifications: ["BAMS", "MD (Panchakarma)", "Ph.D in Detoxification Therapies"],
    specializations: ["Panchakarma", "Detoxification", "Rejuvenation Therapy"],
    experience: 22,
    bio: "Dr. Sanjay Mishra is one of India's leading Panchakarma specialists with over two decades of experience. His expertise in traditional detoxification and rejuvenation therapies has helped thousands of patients achieve optimal health.",
    clinicLocation: "Panchakarma Wellness Center, 345 Health Avenue, Varanasi",
    consultationHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    profileImage: "/images/practitioners/sanjay-mishra.jpg",
    certifications: [
      {
        name: "Master of Panchakarma",
        year: 2008,
        institution: "Banaras Hindu University"
      },
      {
        name: "Advanced Detoxification Specialist",
        year: 2013,
        institution: "International Panchakarma Institute"
      }
    ],
    languages: ["English", "Hindi", "Sanskrit"],
    socialMedia: {
      website: "www.drsanjaymishra.com",
      linkedin: "linkedin.com/in/dr-sanjay-mishra",
      twitter: "@DrSanjayMishra"
    },
    contactEmail: "dr.sanjay.mishra@nutmeg.com"
  },
  {
    name: "Dr. Meena Sharma",
    title: "Skin and Beauty Expert",
    qualifications: ["BAMS", "MD (Ayurvedic Cosmetology)", "Diploma in Dermatology"],
    specializations: ["Skin Health", "Beauty Treatments", "Anti-aging Therapies"],
    experience: 13,
    bio: "Dr. Meena Sharma is an expert in Ayurvedic dermatology and beauty treatments. She combines traditional herbs and modern techniques to provide natural solutions for skin health and anti-aging.",
    clinicLocation: "Natural Beauty Clinic, 678 Glow Street, Jaipur",
    consultationHours: "Tue-Sun: 10:00 AM - 7:00 PM",
    profileImage: "/images/practitioners/meena-sharma.jpg",
    certifications: [
      {
        name: "Ayurvedic Cosmetology Specialist",
        year: 2015,
        institution: "National Institute of Beauty and Health"
      },
      {
        name: "Natural Anti-aging Expert",
        year: 2019,
        institution: "International Beauty Academy"
      }
    ],
    languages: ["English", "Hindi", "Rajasthani"],
    socialMedia: {
      website: "www.drmeenasharma.com",
      linkedin: "linkedin.com/in/dr-meena-sharma",
      twitter: "@DrMeenaSharma"
    },
    contactEmail: "dr.meena.sharma@nutmeg.com"
  },
  {
    name: "Dr. Rohit Agarwal",
    title: "Nutritional Science Expert",
    qualifications: ["BAMS", "MD (Ayurvedic Medicine)", "Ph.D in Nutrition Science"],
    specializations: ["Food Science", "Nutritional Therapy", "Digestive Health"],
    experience: 15,
    bio: "Dr. Rohit Agarwal is a leading expert in Ayurvedic nutrition and food science. His research focuses on the principles of food combining and their effects on digestive health and overall wellness. He has developed innovative dietary protocols that blend traditional Ayurvedic wisdom with modern nutritional science.",
    clinicLocation: "Nutritional Wellness Center, 789 Health Plaza, Lucknow",
    consultationHours: "Mon-Sat: 9:00 AM - 6:00 PM",
    profileImage: "/images/practitioners/rohit-agarwal.jpg",
    certifications: [
      {
        name: "Advanced Nutrition Specialist",
        year: 2016,
        institution: "International Institute of Ayurvedic Nutrition"
      },
      {
        name: "Clinical Dietetics Expert",
        year: 2019,
        institution: "Global Academy of Nutritional Science"
      }
    ],
    languages: ["English", "Hindi", "Bengali"],
    socialMedia: {
      website: "www.drrohitagarwal.com",
      linkedin: "linkedin.com/in/dr-rohit-agarwal",
      twitter: "@DrRohitAgarwal"
    },
    contactEmail: "dr.rohit.agarwal@nutmeg.com"
  },
  {
    name: "Dr. Vikram Chauhan",
    title: "Rejuvenation Therapy Specialist",
    qualifications: ["BAMS", "MD (Rasayana)", "Fellowship in Anti-aging Medicine"],
    specializations: ["Rejuvenation Therapy", "Anti-aging", "Immunity Enhancement"],
    experience: 17,
    bio: "Dr. Vikram Chauhan is renowned for his expertise in Ayurvedic rejuvenation therapies and anti-aging treatments. His innovative approach combines traditional Rasayana practices with modern wellness techniques to enhance vitality and longevity.",
    clinicLocation: "Eternal Wellness Center, 567 Vitality Road, Chandigarh",
    consultationHours: "Mon-Fri: 10:00 AM - 7:00 PM",
    profileImage: "/images/practitioners/vikram-chauhan.jpg",
    certifications: [
      {
        name: "Master of Rasayana Therapy",
        year: 2015,
        institution: "National Academy of Ayurveda"
      },
      {
        name: "Advanced Anti-aging Specialist",
        year: 2018,
        institution: "International Institute of Longevity"
      }
    ],
    languages: ["English", "Hindi", "Punjabi"],
    socialMedia: {
      website: "www.drvikramchauhan.com",
      linkedin: "linkedin.com/in/dr-vikram-chauhan",
      twitter: "@DrVikramChauhan"
    },
    contactEmail: "dr.vikram.chauhan@nutmeg.com"
  }
];

async function seedPractitioners() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Clear existing practitioners
    await Practitioner.deleteMany({});
    
    // Insert new practitioners
    const result = await Practitioner.insertMany(practitioners);
    console.log('Successfully seeded practitioners:', result.length);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding practitioners:', error);
    process.exit(1);
  }
}

seedPractitioners();
