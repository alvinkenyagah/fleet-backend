// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// exports.createDriver = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'Email already exists' });

//     const hashed = await bcrypt.hash(password, 10);
//     const driver = new User({ name, email, password: hashed, role: 'driver' });

//     await driver.save();
//     res.status(201).json({ msg: 'Driver created successfully', driver });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };
