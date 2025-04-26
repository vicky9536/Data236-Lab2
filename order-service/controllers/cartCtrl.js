const Cart = require('../models/cart');
// const Customer = require('../models/customer');
// const Dish = require('../models/dish');
const Order = require('../models/order');
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

// review cart
exports.getCart = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const cartItems = await Cart.find({ customerId }).exec();  
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({error: "Invalid token"});
        } 
        res.status(500).json({error: error.message});
    }
};

// add dish to cart
exports.addCart = async (req, res) => {
    try {
        const { dishId, quantity, restaurantId } = req.body;
        const user = verifyToken(req);
        const customerId = user.customerId;

        const cartItem = await Cart.create({
            dishId: new mongoose.Types.ObjectId(dishId),
            quantity,
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
            customerId: new mongoose.Types.ObjectId(customerId)
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({error: error.message});
    }
};

// delete dish from cart
exports.deleteCart = async (req, res) => {

    try {
        const user = verifyToken(req);
        const customerId = user.customerId;

        const deleted = await Cart.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(req.params.id),
            customerId
        });        
        if (deleted) {
            res.status(200).json({message: "Dish deleted from cart"});
        } else {
            res.status(404).json({error: "Dish not found in cart"});
        }
    } catch (error) {
        console.error("Error deleting from cart:", error);
        res.status(500).json({error: error.message});
    }
};

// checkout
exports.checkout = async (req, res) => {
    // if (!req.session.consumerId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }

    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        const { items, restaurantId } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Calculate total price
        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create a new order
        const order = await Order.create({
            customerId,
            restaurantId,
            price: totalPrice,
            regularStatus: 'New',
            deliveryStatus: 'Order Received',
            items: items
        });

        await Cart.deleteMany({ customerId });

        res.status(200).json(order);
    } catch (error) {
        console.error("Error checking out:", error);
        res.status(500).json({error: error.message});
    }
};