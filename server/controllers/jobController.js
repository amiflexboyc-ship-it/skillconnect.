const Job = require('../models/Job');
const { getDbStatus } = require('../config/db');

let fallbackJobs = [
  {
    _id: 'job_101',
    title: 'Senior React & Node.js Architect for FinTech Dashboard',
    description: 'We are seeking an elite Full-Stack engineer to build a high-throughput financial analytics portal with real-time websocket updates, responsive Tailwind components, and bank-grade security.',
    category: 'Web Development',
    skillsRequired: ['React', 'Node.js', 'Tailwind CSS', 'WebSockets', 'MongoDB'],
    budgetType: 'fixed',
    budget: 3500,
    budgetMax: 5000,
    experienceLevel: 'Expert',
    duration: '1-3 months',
    status: 'open',
    clientName: 'Apex Capital Partners',
    clientLocation: 'New York, USA',
    clientRating: 4.95,
    proposalsCount: 6,
    featured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    _id: 'job_102',
    title: 'Next.js 14 E-Commerce Platform with Stripe & WhatsApp Checkout',
    description: 'Looking for a professional developer to build a lightning-fast modern headless storefront featuring direct WhatsApp inquiries, customer dashboard, and automated inventory sync.',
    category: 'E-Commerce',
    skillsRequired: ['Next.js', 'React', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    budgetType: 'fixed',
    budget: 2800,
    budgetMax: 4000,
    experienceLevel: 'Intermediate',
    duration: 'Less than 1 month',
    status: 'open',
    clientName: 'Lumina Lifestyle',
    clientLocation: 'London, UK',
    clientRating: 4.88,
    proposalsCount: 11,
    featured: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    _id: 'job_103',
    title: 'Full Brand Identity & Mobile App UI/UX Design System',
    description: 'Design a sleek dark-mode mobile UI/UX experience for a global freelance and task marketplace. Must provide interactive Figma prototypes and design token documentation.',
    category: 'UI/UX Design',
    skillsRequired: ['Figma', 'UI/UX Design', 'Design Systems', 'Mobile App Design', 'Prototyping'],
    budgetType: 'hourly',
    budget: 60,
    budgetMax: 85,
    experienceLevel: 'Expert',
    duration: '3-6 months',
    status: 'open',
    clientName: 'Vanguard Studios',
    clientLocation: 'Toronto, Canada',
    clientRating: 5.0,
    proposalsCount: 4,
    featured: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    _id: 'job_104',
    title: 'RESTful Microservices & Database Optimization for Scalable SaaS',
    description: 'Optimize MongoDB indexing, implement Redis caching, and refactor Express.js microservices to handle 100k+ concurrent requests with sub-100ms response times.',
    category: 'Backend Development',
    skillsRequired: ['Node.js', 'MongoDB', 'Redis', 'Docker', 'Express.js'],
    budgetType: 'fixed',
    budget: 4200,
    budgetMax: 6000,
    experienceLevel: 'Expert',
    duration: '1-3 months',
    status: 'open',
    clientName: 'HyperScale Cloud Labs',
    clientLocation: 'Berlin, Germany',
    clientRating: 4.92,
    proposalsCount: 8,
    featured: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  }
];

// @desc    Get all jobs with filters
// @route   GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const { search, category, experienceLevel, budgetType } = req.query;

    if (getDbStatus()) {
      let query = { status: 'open' };
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { skillsRequired: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      if (category && category !== 'All') query.category = category;
      if (experienceLevel && experienceLevel !== 'All') query.experienceLevel = experienceLevel;
      if (budgetType && budgetType !== 'All') query.budgetType = budgetType;

      const jobs = await Job.find(query).sort({ featured: -1, createdAt: -1 });
      return res.json({ success: true, count: jobs.length, jobs });
    } else {
      let results = [...fallbackJobs];
      if (search) {
        const s = search.toLowerCase();
        results = results.filter(j => 
          j.title.toLowerCase().includes(s) || 
          j.description.toLowerCase().includes(s) || 
          j.skillsRequired.some(sk => sk.toLowerCase().includes(s))
        );
      }
      if (category && category !== 'All') {
        results = results.filter(j => j.category.toLowerCase() === category.toLowerCase());
      }
      if (experienceLevel && experienceLevel !== 'All') {
        results = results.filter(j => j.experienceLevel.toLowerCase() === experienceLevel.toLowerCase());
      }
      if (budgetType && budgetType !== 'All') {
        results = results.filter(j => j.budgetType.toLowerCase() === budgetType.toLowerCase());
      }
      return res.json({ success: true, count: results.length, jobs: results });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const job = await Job.findById(id).populate('client', 'name email avatar rating');
      if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
      return res.json({ success: true, job });
    } else {
      const job = fallbackJobs.find(j => j._id === id) || fallbackJobs[0];
      return res.json({ success: true, job });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new job post
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { title, description, category, skillsRequired, budgetType, budget, budgetMax, experienceLevel, duration } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, and budget' });
    }

    const jobData = {
      title,
      description,
      category: category || 'Web Development',
      skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : (skillsRequired ? skillsRequired.split(',').map(s => s.trim()) : ['React', 'JavaScript']),
      budgetType: budgetType || 'fixed',
      budget: Number(budget),
      budgetMax: budgetMax ? Number(budgetMax) : Number(budget) * 1.3,
      experienceLevel: experienceLevel || 'Expert',
      duration: duration || '1-3 months',
      client: req.user ? (req.user.id || req.user._id) : null,
      clientName: req.user?.name || 'Verified Client',
      clientLocation: req.user?.location || 'Global',
      clientRating: 5.0,
      proposalsCount: 0,
      featured: true,
      status: 'open',
    };

    if (getDbStatus()) {
      const job = await Job.create(jobData);
      return res.status(201).json({ success: true, job });
    } else {
      const newJob = {
        _id: 'job_' + Date.now(),
        ...jobData,
        createdAt: new Date().toISOString(),
      };
      fallbackJobs.unshift(newJob);
      return res.status(201).json({ success: true, job: newJob });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin: Delete job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      await Job.findByIdAndDelete(id);
    } else {
      fallbackJobs = fallbackJobs.filter(j => j._id !== id);
    }
    return res.json({ success: true, message: 'Job removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
};
