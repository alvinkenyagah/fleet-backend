// // routes/routeRoutes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   createRoute, 
//   getAllRoutes, 
//   updateRoute, 
//   deleteRoute 
// } = require('../controllers/routeController');
// const { protect, isAdmin } = require('../middleware/authMiddleware');

// router.post('/', protect, isAdmin, createRoute);
// router.get('/', protect, getAllRoutes);
// router.put('/:id', protect, isAdmin, updateRoute);
// router.delete('/:id', protect, isAdmin, deleteRoute);

// module.exports = router;