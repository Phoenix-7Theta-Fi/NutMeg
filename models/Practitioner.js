const mongoose = require('mongoose');

const practitionerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  qualifications: [{
    type: String
  }],
  specializations: [{
    type: String
  }],
  experience: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  clinicLocation: {
    type: String
  },
  consultationHours: {
    type: String
  },
  profileImage: {
    type: String,
    default: '/images/default-profile.png'
  },
  certifications: [{
    name: String,
    year: Number,
    institution: String
  }],
  languages: [{
    type: String
  }],
  socialMedia: {
    website: String,
    linkedin: String,
    twitter: String
  },
  contactEmail: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Practitioner = mongoose.model('Practitioner', practitionerSchema);

module.exports = Practitioner;
