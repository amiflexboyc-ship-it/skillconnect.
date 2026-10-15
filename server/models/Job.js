const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Web Development',
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    budgetType: {
      type: String,
      enum: ['fixed', 'hourly'],
      default: 'fixed',
    },
    budget: {
      type: Number,
      required: true,
    },
    budgetMax: {
      type: Number,
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Intermediate', 'Expert'],
      default: 'Expert',
    },
    duration: {
      type: String,
      default: '1-3 months',
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'closed'],
      default: 'open',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clientName: {
      type: String,
      default: 'TechVentures Global',
    },
    clientLocation: {
      type: String,
      default: 'United States',
    },
    clientRating: {
      type: Number,
      default: 4.9,
    },
    proposalsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
