// controllers/driverController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Create a new driver (requires admin access)
// @route   POST /api/drivers
// @access  Private/Admin
exports.createDriver = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new driver (assigning role 'driver')
    const driver = new User({ name, email, password: hashed, role: 'driver' });

    await driver.save();
    res.status(201).json({ msg: 'Driver created successfully', driver: {
        _id: driver._id,
        name: driver.name,
        email: driver.email,
        role: driver.role,
        createdAt: driver.createdAt,
        updatedAt: driver.updatedAt
    }});
  } catch (err) {
    console.error('Error creating driver:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private/Admin (or potentially accessible by anyone if logic changes)
exports.getAllDrivers = async (req, res) => {
  try {
    // Find all users with role 'driver' and exclude password
    const drivers = await User.find({ role: 'driver' }).select('-password');
    res.status(200).json({ drivers });
  } catch (err) {
    console.error('Error getting all drivers:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get driver by ID
// @route   GET /api/drivers/:id
// @access  Private/Admin (or relevant users)
exports.getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await User.findOne({ _id: id, role: 'driver' }).select('-password');

    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    res.status(200).json({ driver });
  } catch (err) {
    console.error('Error getting driver by ID:', err.message);
    // Check for invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid driver ID format' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get driver by email
// @route   GET /api/drivers/email/:email
// @access  Private/Admin (or relevant users)
exports.getDriverByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const driver = await User.findOne({ email, role: 'driver' }).select('-password');

    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    res.status(200).json({ driver });
  } catch (err) {
    console.error('Error getting driver by email:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};