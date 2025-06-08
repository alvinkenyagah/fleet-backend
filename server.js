// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Assuming you have a db connection file
const cors = require('cors'); // For handling cross-origin requests

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(cors()); // Enable CORS for all origins (for development)

// Import routes
const authRoutes = require('./routes/authRoutes'); // For login/register
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes'); // Assuming you have this
const routeRoutes = require('./routes/routeRoutes');     // Assuming you have this
const tripRoutes = require('./routes/tripRoutes');       // Assuming you have this

// Mount routes
app.use('/api/auth', authRoutes); // e.g., /api/auth/register, /api/auth/login
app.use('/api/drivers', driverRoutes); // All routes in driverRoutes.js will be prefixed with /api/drivers
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/routes', routeRoutes);
// app.use('/api/trips', tripRoutes);

// Basic home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});