const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['freelancer', 'client', 'admin'],
      default: 'freelancer',
    },
    title: {
      type: String,
      default: 'Full-Stack Developer & UI/UX Specialist',
    },
    bio: {
      type: String,
      default: 'Passionate digital professional delivering world-class web and mobile applications with modern architectures and clean UI design.',
    },
    avatar: {
      type: String,
      default: '/images/waris_profile.jpg',
    },
    phone: {
      type: String,
      default: '09077108987',
    },
    whatsapp: {
      type: String,
      default: '09077108987',
    },
    hourlyRate: {
      type: Number,
      default: 45,
    },
    location: {
      type: String,
      default: 'Ibadan, Nigeria',
    },
    skills: {
      type: [String],
      default: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'UI/UX Design', 'Express.js', 'Next.js'],
    },
    rating: {
      type: Number,
      default: 4.95,
    },
    totalReviews: {
      type: Number,
      default: 38,
    },
    completedJobs: {
      type: Number,
      default: 42,
    },
    successRate: {
      type: Number,
      default: 99,
    },
    walletBalance: {
      type: Number,
      default: 2850.00,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isTopRated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
