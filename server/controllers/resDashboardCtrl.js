const { Restaurant } = require('../models');
const { Dish } = require('../models');

// Get all restaurants
exports.getAllRest = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            attributes: ['id', 'name', 'description', 'location', 'contact_info', 'timings', 'image_url'],
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
        const restaurant_Id = req.params.id;
        const restaurant = await Restaurant.findByPk(restaurant_Id, {
            attributes: ['id', 'name', 'location', 'description', 'image_url', 'timings', 'contact_info'],
            include: [{ model: Dish, attributes: ['id', 'name', 'description', 'price', 'category'] }]
        });

        console.log("Restaurant:", restaurant);

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({error: error.message});
    }
};