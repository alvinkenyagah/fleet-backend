// controllers/vehicleController.js
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.createVehicle = async (req, res) => {
  const { plateNumber, make, model, year, capacity, fuelType } = req.body;
  
  try {
    const existingVehicle = await Vehicle.findOne({ plateNumber: plateNumber.toUpperCase() });
    if (existingVehicle) {
      return res.status(400).json({ msg: 'Vehicle with this plate number already exists' });
    }

    const vehicle = new Vehicle({
      plateNumber: plateNumber.toUpperCase(),
      make,
      model,
      year,
      capacity,
      fuelType
    });

    await vehicle.save();
    res.status(201).json({ msg: 'Vehicle created successfully', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('assignedDriver', 'name email');
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.updateVehicleStatus = async (req, res) => {
  const { status } = req.body;
  
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('assignedDriver', 'name email');
    
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    
    res.json({ msg: 'Vehicle status updated', vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};



exports.assignDriverToVehicle = async (req, res) => {
  const { vehicleId, driverId } = req.body;
  
  try {
    const driver = await User.findById(driverId);
    if (!driver || driver.role !== 'driver') {
      return res.status(404).json({ msg: 'Driver not found' });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    // Unassign the driver from any other vehicle
    await Vehicle.updateMany(
      { assignedDriver: driverId },
      { $set: { assignedDriver: null } }
    );

    // Assign to the new vehicle
    vehicle.assignedDriver = driverId;
    await vehicle.save();

    const updatedVehicle = await Vehicle.findById(vehicleId).populate('assignedDriver', 'name email');
    res.json({ msg: 'Driver assigned successfully', vehicle: updatedVehicle });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
