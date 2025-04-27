const Restaurant = require('../models/restaurant');
const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("No token provided");
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error("Token format invalid");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
};

exports.viewMyRestInfo = async (req, res) => {
    try {
        const user = verifyToken(req);
        const restaurantId = user.id;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant info:", error);
        res.status(500).json({error: error.message});
    }
};

// View restaurant info
exports.viewRestInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ name: req.params.name });
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant info:", error);
        res.status(500).json({error: error.message});
    }
};

// Update restaurant info
exports.updateRestInfo = async (req, res) => {
    // console.log("Received request to update restaurant profile:", req.session.restaurantId);
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const restaurantId = user.id;
        const { name, location, description, contact_info, timings } = req.body;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        restaurant.name = name;
        restaurant.location = location;
        restaurant.description = description;
        restaurant.contact_info = contact_info;
        restaurant.timings = timings;
        await restaurant.save();
        // user.Restaurant = { ...user.Restaurant, name, location, description, contact_info, timings };
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error updating restaurant profile:", error);
        res.status(500).json({error: error.message});
    }
};