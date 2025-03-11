const { Favorite } = require('../models');

// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
    const { customer_Id } = req.params; 

    if (!customer_Id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const favorite = await Favorite.create({
            customer_Id: customer_Id, 
            restaurant_Id: req.body.restaurant_Id,
        });
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all favorites for a specific customer
exports.getFavorites = async (req, res) => {
    const { customer_Id } = req.params; // Use customer_Id from route parameter

    if (!customer_Id) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const favorites = await Favorite.findAll({
            where: { customer_Id: customer_Id },  // Using customer_Id from the route parameter
        });
        console.log("Favorites:", favorites);
        res.status(200).json(favorites);
    } catch (error) {
        console.error("Error fetching favorite list:", error);
        res.status(500).json({ error: error.message });
    }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
    const { customer_Id, id } = req.params; 
    if (!customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }

    try {
        // Remove the favorite by checking the customer_Id and favorite ID
        const deleted = await Favorite.destroy({
            where: { id: id, customer_Id: customer_Id }  // Using customer_Id from the URL
        });
        if (deleted) {
            res.status(200).json({ message: "Favorite removed" });
        } else {
            res.status(404).json({ error: "Favorite not found or does not belong to this customer" });
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: error.message });
    }
};