// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createVehicle, 
  getAllVehicles, 
  assignDriverToVehicle, 
  updateVehicleStatus 
} = require('../controllers/vehicleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Create vehicle
router.post('/', protect, isAdmin, createVehicle);

// Get all vehicles
router.get('/', protect, getAllVehicles);

// Assign driver to vehicle
router.put('/assign-driver', protect, isAdmin, assignDriverToVehicle);

// Update vehicle status - Fixed route parameter
router.put('/:id/status', protect, isAdmin, updateVehicleStatus);

module.exports = router;

