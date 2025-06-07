// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plateNumber: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true 
  },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  capacity: { type: Number, required: true },
  fuelType: { 
    type: String, 
    enum: ['petrol', 'diesel', 'electric', 'hybrid'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'maintenance', 'inactive'], 
    default: 'active' 
  },
  assignedDriver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);