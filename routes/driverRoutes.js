const express = require('express');
const router = express.Router();
const { createDriver } = require('../controllers/driverController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', protect, isAdmin, createDriver);

module.exports = router;
