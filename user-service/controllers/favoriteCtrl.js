const Favorite = require('../models/favorite');
// const Restaurant = require('../models/restaurant');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); 

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

// Get all favorite restaurants for a user
exports.getFavorites = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.customerId;

        // Fetch favorites and populate the associated restaurant details
        const favorites = await Favorite.find({ customerId }).exec();

        // Extract restaurantId
        const restaurantIds = favorites.map(favorite => favorite.restaurantId);

        res.json({ restaurantIds });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: error.message });
    }
};

// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const restaurantId = new mongoose.Types.ObjectId(req.body.restaurantId);
        const favorite = await Favorite.create({
            customerId, restaurantId: restaurantId
        });
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({error: error.message});
    }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.id;

        const favoriteId = req.params.id;
        const objectId = new mongoose.Types.ObjectId(favoriteId);

        // Try to delete the favorite by _id and customerId
        const deletedFavorite = await Favorite.findOneAndDelete({
            _id: objectId,
            customerId
        });

        if (deletedFavorite) {
            res.status(200).json({ message: "Favorite removed" });
        } else {
            res.status(404).json({ error: "Favorite not found" });
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: error.message });
    }
};