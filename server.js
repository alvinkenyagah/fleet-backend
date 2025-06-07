const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import existing routes first
// const authRoutes = require('./routes/authRoutes');
// const driverRoutes = require('./routes/driverRoutes');

// Comment out new routes initially to test
// const vehicleRoutes = require('./routes/vehicleRoutes');
// const routeRoutes = require('./routes/routeRoutes');
// const tripRoutes = require('./routes/tripRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fleet Management System API', 
    version: '1.0.0',
    status: 'Running' 
  });
});

// Start with existing routes only
// app.use('/api/auth', authRoutes);
// app.use('/api/drivers', driverRoutes);

// Add new routes one by one after testing
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/routes', routeRoutes);
// app.use('/api/trips', tripRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    msg: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;