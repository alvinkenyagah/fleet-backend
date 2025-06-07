// controllers/routeController.js
const Route = require('../models/Route');

exports.createRoute = async (req, res) => {
  const { name, startLocation, endLocation, distance, estimatedDuration, stops } = req.body;
  
  try {
    const route = new Route({
      name,
      startLocation,
      endLocation,
      distance,
      estimatedDuration,
      stops: stops || []
    });

    await route.save();
    res.status(201).json({ msg: 'Route created successfully', route });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ isActive: true });
    res.json(routes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!route) {
      return res.status(404).json({ msg: 'Route not found' });
    }
    
    res.json({ msg: 'Route updated successfully', route });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!route) {
      return res.status(404).json({ msg: 'Route not found' });
    }
    
    res.json({ msg: 'Route deactivated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};