const Project = require('../models/Project');
const { getDbStatus } = require('../config/db');

let fallbackProjects = [
  {
    _id: 'proj_01',
    title: 'Enterprise FinTech Trading Dashboard Architecture',
    clientName: 'Apex Capital Partners',
    freelancerName: 'Waris (AmiFlexboy)',
    amount: 4500,
    progress: 75,
    status: 'active',
    deadline: '2026-11-20',
    milestones: [
      { id: 1, title: 'UI Design System & Tailwind Layout', amount: 1200, status: 'paid' },
      { id: 2, title: 'Real-time WebSocket & Charting Engine', amount: 1800, status: 'paid' },
      { id: 3, title: 'Security Audit & Final Deployment', amount: 1500, status: 'in-progress' },
    ],
  },
  {
    _id: 'proj_02',
    title: 'Modern E-Commerce Store with WhatsApp Checkout',
    clientName: 'Lumina Lifestyle',
    freelancerName: 'Waris (AmiFlexboy)',
    amount: 3200,
    progress: 100,
    status: 'completed',
    deadline: '2026-10-10',
    milestones: [
      { id: 1, title: 'Storefront Setup & Catalog Design', amount: 1600, status: 'paid' },
      { id: 2, title: 'WhatsApp Direct Ordering & Payment Gate', amount: 1600, status: 'paid' },
    ],
  },
  {
    _id: 'proj_03',
    title: 'Interactive 3D Landing Page & Brand Animations',
    clientName: 'Vanguard Studios',
    freelancerName: 'Marcus Vance',
    amount: 2100,
    progress: 40,
    status: 'active',
    deadline: '2026-12-05',
    milestones: [
      { id: 1, title: 'Concept Sketches & Storyboards', amount: 900, status: 'paid' },
      { id: 2, title: 'Three.js / WebGL Interaction Build', amount: 1200, status: 'in-progress' },
    ],
  }
];

// @desc    Get user projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    if (getDbStatus()) {
      const projects = await Project.find().sort({ updatedAt: -1 });
      return res.json({ success: true, count: projects.length, projects });
    } else {
      return res.json({ success: true, count: fallbackProjects.length, projects: fallbackProjects });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const project = await Project.findById(id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, project });
    } else {
      const project = fallbackProjects.find(p => p._id === id) || fallbackProjects[0];
      return res.json({ success: true, project });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create project (e.g. Hire Freelancer)
// @route   POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, clientName, freelancerName, amount, deadline } = req.body;
    const newProj = {
      _id: 'proj_' + Date.now(),
      title: title || 'New Client Engagement',
      clientName: clientName || (req.user ? req.user.name : 'Verified Client'),
      freelancerName: freelancerName || 'Waris (AmiFlexboy)',
      amount: Number(amount) || 1500,
      progress: 10,
      status: 'active',
      deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      milestones: [
        { id: 1, title: 'Initial Milestone & Architecture', amount: (Number(amount) || 1500) * 0.5, status: 'in-progress' },
        { id: 2, title: 'Final Delivery & Acceptance', amount: (Number(amount) || 1500) * 0.5, status: 'pending' },
      ],
    };

    if (getDbStatus()) {
      const project = await Project.create(newProj);
      return res.status(201).json({ success: true, project });
    } else {
      fallbackProjects.unshift(newProj);
      return res.status(201).json({ success: true, project: newProj });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
};
