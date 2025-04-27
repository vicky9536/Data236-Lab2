const Dish = require('../models/dish');
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

// Create new dish
exports.createDish = async (req, res) => {
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const restaurantId = user.id;
        console.log("restaurantId:", restaurantId);
        const { name, description, price, category } = req.body;
        const dish = await Dish.create({
            name,
            description,
            price,
            category,
            restaurantId: new mongoose.Types.ObjectId(restaurantId)
        });
        res.status(201).json(dish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({error: error.message});
    }
};

// Get one dish
exports.getOneDish = async (req, res) => {
    try {
        const user = verifyToken(req);
        const restaurantId = user.id;
        dishName = req.params.dishName;
        const dish = await Dish.findOne({
            name: dishName,
            restaurantId: restaurantId
        });

        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (error) {
        console.error("Error fetching dish:", error);
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
        const restaurantId = user.id;
        const dishId = new mongoose.Types.ObjectId(req.params.id);
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
        const restaurantId = user.id;
        const deletedDish = await Dish.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(req.params.id),
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