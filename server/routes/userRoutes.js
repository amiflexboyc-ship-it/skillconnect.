const express = require('express');
const router = express.Router();
const {
  getFreelancers,
  getUserById,
  updateUserProfile,
  adminGetAllUsers,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/freelancers', getFreelancers);
router.get('/admin/all', protect, adminOnly, adminGetAllUsers);
router.get('/:id', getUserById);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
