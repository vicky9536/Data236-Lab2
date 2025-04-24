const { Favorite } = require('../models');
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

// Get all favorite restaurants for a user
exports.getFavorites = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const favorites = await Favorite.findAll({
            where: { customerId },
            include: [{ model: Restaurant, as: 'restaurant' }]
        });
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({error: error.message});
    }
};

// Add a restaurant to favorites
exports.addFavorite = async (req, res) => {
    // if (!req.session.consumerId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const favorite = await Favorite.create({
            customerId, restaurantId: req.body.restaurantId
        });
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({error: error.message});
    }
};

// Remove a restaurant from favorites
exports.removeFavorite = async (req, res) => {
//     if (!req.session.consumerId) {
//         return res.status(401).json({error: "Unauthorized"});
//     }

    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const deletedFavorite = await Favorite.findOneAndDelete({
            _id: req.params.id,
            customerId
        });
        if (deletedFavorite) {
            res.status(200).json({message: "Favorite removed"});
        } else {
            res.status(404).json({error: "Favorite not found"});
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({error: error.message});
    }
};