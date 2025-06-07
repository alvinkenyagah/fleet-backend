// controllers/tripController.js
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');
const User = require('../models/User');

exports.createTrip = async (req, res) => {
  const { driverId, vehicleId, routeId, scheduledStartTime, scheduledEndTime, passengerCount } = req.body;
  
  try {
    const driver = await User.findById(driverId);
    const vehicle = await Vehicle.findById(vehicleId);
    const route = await Route.findById(routeId);
    
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: 'Driver not found' });
    }
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    if (!route) {
      return res.status(404).json({ msg: 'Route not found' });
    }

    const trip = new Trip({
      driver: driverId,
      vehicle: vehicleId,
      route: routeId,
      scheduledStartTime: new Date(scheduledStartTime),
      scheduledEndTime: new Date(scheduledEndTime),
      passengerCount: passengerCount || 0,
      createdBy: req.user.id
    });

    await trip.save();
    
    const populatedTrip = await Trip.findById(trip._id)
      .populate('driver', 'name email')
      .populate('vehicle', 'plateNumber make model')
      .populate('route', 'name startLocation endLocation');
    
    res.status(201).json({ msg: 'Trip scheduled successfully', trip: populatedTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getDriverTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ driver: req.user.id })
      .populate('vehicle', 'plateNumber make model')
      .populate('route', 'name startLocation endLocation distance estimatedDuration')
      .sort({ scheduledStartTime: -1 });
    
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('driver', 'name email')
      .populate('vehicle', 'plateNumber make model')
      .populate('route', 'name startLocation endLocation')
      .sort({ scheduledStartTime: -1 });
    
    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTripStatus = async (req, res) => {
  const { status, notes } = req.body;
  
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    if (req.user.role !== 'admin' && trip.driver.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    trip.status = status;
    if (notes) trip.notes = notes;
    
    if (status === 'in_progress' && !trip.actualStartTime) {
      trip.actualStartTime = new Date();
    }
    
    if (status === 'completed' && !trip.actualEndTime) {
      trip.actualEndTime = new Date();
    }

    await trip.save();
    
    const updatedTrip = await Trip.findById(trip._id)
      .populate('driver', 'name email')
      .populate('vehicle', 'plateNumber make model')
      .populate('route', 'name startLocation endLocation');
    
    res.json({ msg: 'Trip status updated', trip: updatedTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getDriverDashboard = async (req, res) => {
  try {
    const driverId = req.user.id;
    
    const totalTrips = await Trip.countDocuments({ driver: driverId });
    const completedTrips = await Trip.countDocuments({ driver: driverId, status: 'completed' });
    const pendingTrips = await Trip.countDocuments({ driver: driverId, status: 'pending' });
    const inProgressTrips = await Trip.countDocuments({ driver: driverId, status: 'in_progress' });
    
    const assignedVehicle = await Vehicle.findOne({ assignedDriver: driverId });
    
    const recentTrips = await Trip.find({ driver: driverId })
      .populate('route', 'name startLocation endLocation')
      .populate('vehicle', 'plateNumber')
      .sort({ scheduledStartTime: -1 })
      .limit(5);
    
    const dashboard = {
      statistics: {
        totalTrips,
        completedTrips,
        pendingTrips,
        inProgressTrips
      },
      assignedVehicle,
      recentTrips
    };
    
    res.json(dashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};