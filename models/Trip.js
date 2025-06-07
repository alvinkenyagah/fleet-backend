// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vehicle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vehicle', 
    required: true 
  },
  route: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Route', 
    required: true 
  },
  scheduledStartTime: { type: Date, required: true },
  scheduledEndTime: { type: Date, required: true },
  actualStartTime: { type: Date },
  actualEndTime: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'],
    default: 'pending' 
  },
  passengerCount: { type: Number, default: 0 },
  notes: { type: String },
  fuelUsed: { type: Number },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
