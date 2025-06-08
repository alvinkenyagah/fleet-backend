// // routes/tripRoutes.js
// const express = require('express');
// const router = express.Router();

// const {
//   createTrip,
//   getDriverTrips,
//   getAllTrips,
//   updateTripStatus,
//   getDriverDashboard // <= Re-type this line and the comma before it
// } = require('../controllers/tripController');

// const { protect, isAdmin, isDriver } = require('../middleware/authMiddleware');

// router.post('/', protect, isAdmin, createTrip);
// router.get('/my-trips', protect, isDriver, getDriverTrips);
// router.get('/dashboard', protect, isDriver, getDriverDashboard);
// router.get('/', protect, isAdmin, getAllTrips);
// router.put('/:id/status', protect, updateTripStatus);

// module.exports = router;