// models/Route.js
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedDuration: { type: Number, required: true },
  stops: [{ 
    name: String, 
    order: Number 
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);