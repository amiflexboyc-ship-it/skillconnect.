const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'skillconnect_super_secret_jwt_token_key_2026_waris');
      
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Fallback if in mock memory mode
        req.user = { _id: decoded.id, id: decoded.id, email: decoded.email, role: decoded.role || 'freelancer' };
      }
      
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.email === 'amiflexboyc@gmail.com')) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin privileges required' });
  }
};

module.exports = { protect, adminOnly };
