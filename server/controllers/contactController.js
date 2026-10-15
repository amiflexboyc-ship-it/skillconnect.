const ContactMessage = require('../models/ContactMessage');
const { getDbStatus } = require('../config/db');
const { sendContactNotification } = require('../services/emailService');

let fallbackMessages = [
  {
    _id: 'msg_01',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprisecorp.com',
    phone: '+1 650 334 9901',
    subject: 'Enterprise Partnership Inquiry',
    message: 'We are looking to onboard 15+ dedicated full-stack developers for our AI-powered fintech platform. Can we schedule a brief discovery call with Waris?',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    _id: 'msg_02',
    name: 'David Oladipo',
    email: 'david.oladipo@cloudscale.ng',
    phone: '08034567890',
    subject: 'Mobile App Custom Development',
    message: 'Saw your portfolio work on SkillConnect. I have an ongoing logistics app project in Lagos and need senior React Native / Node expertise.',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
  }
];

// @desc    Submit contact message
// @route   POST /api/contact
const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newMsg = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    if (getDbStatus()) {
      await ContactMessage.create(newMsg);
    } else {
      newMsg._id = 'msg_' + Date.now();
      fallbackMessages.unshift(newMsg);
    }

    // Trigger email alert
    await sendContactNotification({ name, email, phone, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by Waris and the team. We will respond promptly via email or WhatsApp (09077108987).',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
const getContactMessages = async (req, res) => {
  try {
    if (getDbStatus()) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, messages });
    } else {
      return res.json({ success: true, count: fallbackMessages.length, messages: fallbackMessages });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update contact message status (Admin)
// @route   PUT /api/contact/:id
const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getDbStatus()) {
      const msg = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, message: msg });
    } else {
      const msg = fallbackMessages.find(m => m._id === id);
      if (msg) msg.status = status;
      return res.json({ success: true, message: msg });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
};
