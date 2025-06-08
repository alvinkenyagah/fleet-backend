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



exports.updateVehicle = async (req, res) => {
  const { id } = req.params; // Vehicle ID from URL parameter
  const { plateNumber, make, model, year, capacity, fuelType, status } = req.body;

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    // Check if plate number is being changed to an existing one (excluding the current vehicle)
    if (plateNumber && plateNumber.toUpperCase() !== vehicle.plateNumber) {
      const existingVehicle = await Vehicle.findOne({ plateNumber: plateNumber.toUpperCase() });
      if (existingVehicle) {
        return res.status(400).json({ msg: 'Vehicle with this plate number already exists' });
      }
    }

    vehicle.plateNumber = plateNumber ? plateNumber.toUpperCase() : vehicle.plateNumber;
    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.capacity = capacity || vehicle.capacity;
    vehicle.fuelType = fuelType || vehicle.fuelType;
    vehicle.status = status || vehicle.status;

    await vehicle.save();
    const updatedVehicle = await Vehicle.findById(id).populate('assignedDriver', 'name email');
    res.json({ msg: 'Vehicle updated successfully', vehicle: updatedVehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};




exports.assignDriverToVehicle = async (req, res) => {
  const { vehicleId, driverId } = req.body;

  try {
    const update = {
      assignedDriver: driverId === 'null' || !driverId ? null : driverId,
    };

    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, update, { new: true }).populate('assignedDriver');

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }

    return res.status(200).json({ message: 'Driver assignment updated successfully.', vehicle });
  } catch (error) {
    console.error('Error assigning driver:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};



// controllers/vehicleController.js (add this)
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('assignedDriver', 'name email');
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    // Handle CastError for invalid IDs
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};
