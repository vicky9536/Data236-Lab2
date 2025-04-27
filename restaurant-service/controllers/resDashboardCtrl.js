const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');
const mongoose = require('mongoose');

// Get all restaurants
exports.getAllRest = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}, {
            name: 1,
            description: 1,
            location: 1,
            contact_info: 1,
            timings: 1,
            image_url: 1
        });        
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({error: error.message});
    }
};

// Get dishes for a specific restaurant
exports.getDishes = async (req, res) => {
    try {
        restaurantId = new mongoose.Types.ObjectId(req.params.id);
        const restaurant = await Restaurant.findById(restaurantId)
            .select('name location description image_url timings')
            .populate({
                path: 'dishes',
                select: 'name description price category' // dish fields
            });
        
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ error: error.message });
    }
};
