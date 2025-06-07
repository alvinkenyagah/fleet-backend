//driver route
const express = require('express');
const router = express.Router();
const { createDriver } = require('../controllers/driverController');
const { getAllDrivers } = require('../controllers/driverController');
const { getDriverById } = require('../controllers/driverController');
const { getDriverByEmail } = require('../controllers/driverController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, isAdmin, createDriver);

// Example routes
router.get('/drivers', getAllDrivers);
router.get('/drivers/:id', getDriverById);
router.get('/drivers/email/:email', getDriverByEmail);

module.exports = router;
