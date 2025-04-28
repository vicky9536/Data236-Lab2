const Cart = require('../models/cart');
// const Customer = require('../models/customer');
// const Dish = require('../models/dish');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { sendOrderCreatedEvent } = require('../kafka/producer');

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
            customerId: customerId
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({error: error.message});
    }
};

// update quantity of dish in cart
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const user = verifyToken(req);
        const customerId = user.customerId;
        const cartItem = await Cart.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id), customerId },
            { quantity },
            { new: true }
        );
        if (cartItem) {
            res.status(200).json(cartItem);
        } else {
            res.status(404).json({error: "Cart item not found"});
        }
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({error: error.message});
    }
}


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
    try {
        const user = verifyToken(req);
        const customerId = user.customerId;
        console.log('Checkout Request Body:', req.body);
        const { cartItems, restaurantId, totalPrice } = req.body;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }
        const order = await Order.create({
            customerId,
            restaurantId: new mongoose.Types.ObjectId(restaurantId),
            customerName: user.name,
            price: totalPrice,
            regularStatus: 'New',
            deliveryStatus: 'Order Received',
        });

        await sendOrderCreatedEvent(order);
        console.log('Kafka event sent for new order.');

        await Cart.deleteMany({ customerId });

        res.status(200).json(order);
    } catch (error) {
        console.error("Error checking out:", error);
        res.status(500).json({error: error.message});
    }
};