const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  dueDate: Date,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'submitted', 'paid'],
    default: 'pending',
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    clientName: String,
    freelancerName: String,
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    amount: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      default: 25,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['active', 'in-review', 'completed', 'cancelled'],
      default: 'active',
    },
    deadline: Date,
    milestones: [milestoneSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
