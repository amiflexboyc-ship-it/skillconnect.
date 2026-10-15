const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
} = require('../controllers/contactController');

router.post('/', submitContactMessage);
router.get('/', getContactMessages);
router.put('/:id', updateMessageStatus);

module.exports = router;
