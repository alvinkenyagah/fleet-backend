// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  assignDriverToVehicle,
  updateVehicleStatus,
  updateVehicle,
  getVehicleById
} = require('../controllers/vehicleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Create vehicle
router.post('/', protect, isAdmin, createVehicle);

// Get all vehicles
router.get('/', protect, getAllVehicles);
router.get('/:id', protect, isAdmin, getVehicleById);

// Assign driver to vehicle (and unassign if driverId is null)
router.put('/assign-driver', protect, isAdmin, assignDriverToVehicle);

// Update vehicle status
router.put('/:id/status', protect, isAdmin, updateVehicleStatus);

// Update vehicle details
router.put('/:id', protect, isAdmin, updateVehicle); // New route for updating vehicle details

module.exports = router;