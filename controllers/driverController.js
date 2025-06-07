const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createDriver = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const driver = new User({ name, email, password: hashed, role: 'driver' });

    await driver.save();
    res.status(201).json({ msg: 'Driver created successfully', driver });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' }).select('-password');
    res.status(200).json({ drivers });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get driver by ID
exports.getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await User.findOne({ _id: id, role: 'driver' }).select('-password');
    
    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }
    
    res.status(200).json({ driver });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get driver by email
exports.getDriverByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const driver = await User.findOne({ email, role: 'driver' }).select('-password');
    
    if (!driver) {
      return res.status(404).json({ msg: 'Driver not found' });
    }
    
    res.status(200).json({ driver });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};