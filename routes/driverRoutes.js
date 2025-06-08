// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const { createDriver, getAllDrivers, getDriverById, getDriverByEmail } = require('../controllers/driverController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route to create a new driver (requires admin protection)
router.post('/', protect, isAdmin, createDriver);

// Route to get all drivers
// You might want to protect this too, depending on who should see all drivers
router.get('/', protect, isAdmin, getAllDrivers); // Changed from '/drivers' to '/'

// Route to get a driver by ID
router.get('/:id', protect, getDriverById); // Protect this, but maybe not strictly isAdmin if a driver can view their own profile

// Route to get a driver by email
router.get('/email/:email', protect, getDriverByEmail); // Protect this as well

module.exports = router;