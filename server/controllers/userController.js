const User = require('../models/User');
const { getDbStatus } = require('../config/db');
const { fallbackUsers } = require('./authController');

// @desc    Get all freelancers with filtering
// @route   GET /api/users/freelancers
const getFreelancers = async (req, res) => {
  try {
    const { search, skill, minRate, maxRate, sort } = req.query;

    if (getDbStatus()) {
      let query = { role: { $in: ['freelancer', 'admin'] } };
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { skills: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      if (skill) {
        query.skills = { $in: [new RegExp(skill, 'i')] };
      }
      const freelancers = await User.find(query).select('-password').sort({ isTopRated: -1, rating: -1 });
      return res.json({ success: true, count: freelancers.length, freelancers });
    } else {
      let result = fallbackUsers.filter(u => u.role === 'freelancer' || u.role === 'admin');
      if (search) {
        const s = search.toLowerCase();
        result = result.filter(u => 
          u.name.toLowerCase().includes(s) || 
          u.title.toLowerCase().includes(s) || 
          u.skills.some(sk => sk.toLowerCase().includes(s))
        );
      }
      if (skill) {
        result = result.filter(u => u.skills.some(sk => sk.toLowerCase().includes(skill.toLowerCase())));
      }
      return res.json({ success: true, count: result.length, freelancers: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single user profile by ID
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      const user = await User.findById(id).select('-password');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, user });
    } else {
      const user = fallbackUsers.find(u => u._id === id || u.email === id) || fallbackUsers[0];
      return res.json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, title, bio, hourlyRate, phone, whatsapp, location, skills, avatar } = req.body;

    if (getDbStatus()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      if (name) user.name = name;
      if (title) user.title = title;
      if (bio) user.bio = bio;
      if (hourlyRate) user.hourlyRate = hourlyRate;
      if (phone) user.phone = phone;
      if (whatsapp) user.whatsapp = whatsapp;
      if (location) user.location = location;
      if (skills) user.skills = skills;
      if (avatar) user.avatar = avatar;

      const updated = await user.save();
      return res.json({ success: true, user: updated });
    } else {
      const user = fallbackUsers.find(u => u._id === userId) || fallbackUsers[0];
      Object.assign(user, { name, title, bio, hourlyRate, phone, whatsapp, location, skills, avatar });
      return res.json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin: Get all users
// @route   GET /api/users/admin/all
const adminGetAllUsers = async (req, res) => {
  try {
    if (getDbStatus()) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.json({ success: true, count: users.length, users });
    } else {
      return res.json({ success: true, count: fallbackUsers.length, users: fallbackUsers });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFreelancers,
  getUserById,
  updateUserProfile,
  adminGetAllUsers,
};
