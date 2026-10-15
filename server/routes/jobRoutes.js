const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, deleteJob } = require('../controllers/jobController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.delete('/:id', protect, adminOnly, deleteJob);

module.exports = router;
