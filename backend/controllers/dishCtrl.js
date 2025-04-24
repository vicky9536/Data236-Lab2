const { Dish } = require('../models');
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

// Create new dish
exports.createDish = async (req, res) => {
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const restaurantId = user.restaurantId;
        const { name, description, price, category } = req.body;
        const dish = await Dish.create({
            name,
            description,
            price,
            category,
            restaurantId
        });
        res.status(201).json(dish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Update dish
exports.updateDish = async (req, res) => {
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const restaurantId = user.restaurantId;
        const updatedDish = await Dish.findOneAndUpdate(
            { _id: req.params.id, restaurantId },
            req.body,
            { new: true } // return updated doc
        );

        if (!updatedDish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json(updatedDish);
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Delete dish
exports.deleteDish = async (req, res) => {
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const restaurantId = user.restaurantId;
        const deletedDish = await Dish.findOneAndDelete({
            _id: req.params.id,
            restaurantId
        });

        if (!deletedDish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json({ message: "Dish deleted" });
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({error: error.message});
    }
};