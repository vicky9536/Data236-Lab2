const { Restaurant } = require('../models');

// View restaurant info
exports.viewRestInfo = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
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
    /* console.log("Received request to update restaurant profile:", req.session.restaurant_Id);
    if (!req.session.restauran_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    try {
        const restauran_Id = req.params.id;
        console.log("Received request to update restaurant profile:", restauran_Id);
        const { name, location, description, contact_info, timings, image_url } = req.body;
        const restaurant = await Restaurant.findByPk(restauran_Id);
        if (!restaurant) {
            return res.status(404).json({error: "Restaurant not found"});
        }
        restaurant.name = name;
        restaurant.location = location;
        restaurant.description = description;
        restaurant.contact_info = contact_info;
        restaurant.timings = timings;
        restaurant.image_url = image_url;
        await restaurant.save();
        //req.session.Restaurant = { ...req.session.Restaurant, name, location, description, contact_info, timings, image_url };
        res.status(200).json(restaurant);
    } catch (error) {
        console.error("Error updating restaurant profile:", error);
        res.status(500).json({error: error.message});
    }
};