const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewerName: {
      type: String,
      required: true,
    },
    reviewerAvatar: {
      type: String,
      default: '',
    },
    reviewerRole: {
      type: String,
      default: 'Client',
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobTitle: {
      type: String,
      default: 'Full-Stack Web Application',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
