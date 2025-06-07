// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token;
  
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
      
//       if (!req.user) {
//         return res.status(401).json({ msg: 'Not authorized, user not found' });
//       }
      
//       next();
//     } catch (error) {
//       console.error('Auth error:', error);
//       return res.status(401).json({ msg: 'Not authorized, token failed' });
//     }
//   } else {
//     return res.status(401).json({ msg: 'Not authorized, no token' });
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ msg: 'Access denied. Admin only.' });
//   }
// };

// const isDriver = (req, res, next) => {
//   if (req.user && req.user.role === 'driver') {
//     next();
//   } else {
//     res.status(403).json({ msg: 'Access denied. Driver only.' });
//   }
// };

// module.exports = { protect, isAdmin, isDriver };