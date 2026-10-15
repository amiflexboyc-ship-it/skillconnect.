const Notification = require('../models/Notification');
const { getDbStatus } = require('../config/db');

let fallbackNotifications = [
  {
    _id: 'notif_01',
    title: 'New Contract Milestone Approved',
    message: 'Apex Capital Partners approved milestone #2. $1,800.00 credited to your wallet.',
    type: 'payment',
    read: false,
    link: '/wallet',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    _id: 'notif_02',
    title: 'New Client Message',
    message: 'Elena Rostova sent you a new message regarding the FinTech project.',
    type: 'message',
    read: false,
    link: '/messages',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: 'notif_03',
    title: 'Top Rated Badge Achieved!',
    message: 'Congratulations Waris! Your 100% job success score earned you the SkillConnect Top Rated Gold badge.',
    type: 'system',
    read: true,
    link: '/freelancer-profile',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: 'notif_04',
    title: 'New Matching Job Posted',
    message: "A new job matching your skill 'React & Node.js' was posted: $3,500 budget.",
    type: 'job',
    read: true,
    link: '/find-jobs',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  }
];

// @desc    Get user notifications
// @route   GET /api/notifications
const getNotifications = async (req, res) => {
  try {
    if (getDbStatus()) {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: notifications.length, notifications });
    } else {
      return res.json({ success: true, count: fallbackNotifications.length, notifications: fallbackNotifications });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDbStatus()) {
      await Notification.findByIdAndUpdate(id, { read: true });
    } else {
      const n = fallbackNotifications.find(item => item._id === id);
      if (n) n.read = true;
    }
    return res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark all as read
// @route   PUT /api/notifications/read-all
const markAllAsRead = async (req, res) => {
  try {
    if (getDbStatus()) {
      await Notification.updateMany({}, { read: true });
    } else {
      fallbackNotifications.forEach(n => (n.read = true));
    }
    return res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
