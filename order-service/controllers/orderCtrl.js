const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const { sendOrderCreatedEvent } = require('../kafka/producer');
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

// get all orders for a customer
exports.getAllCustomerOrders = async (req, res) => {
    const user = verifyToken(req);
    if (!user.customerId) {
        return res.status(403).json({ error: "Forbidden: only customers can view orders" });
    }    

    try {
        const customerId = user.customerId;
        const orders = await Order.find({ customerId }).exec();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({error: error.message});
    }
};

// get all orders for a restaurant
exports.getAllRestaurantOrders = async (req, res) => {
    const user = verifyToken(req);
    if (!user.id) {
        return res.status(403).json({ error: "Forbidden: only restaurants can view orders" });
    }
    try {
        const restaurantId = user.id;
        const orders = await Order.find({ restaurantId }).exec();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({error: error.message});
    }
};

// get order by id
exports.getOrderById = async (req, res) => {
    const user = verifyToken(req);
    if (!user.id) {
        return res.status(403).json({ error: "Forbidden: only restaurants can view orders" });
    }

    try {
        const orderId = new mongoose.Types.ObjectId(req.params.id);
        const order = await Order.findById(orderId).exec();
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({error: error.message});
    }
};

// create a new order
exports.createOrder = async (req, res) => {
    // if (!req.session.consumerId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }
    const user = verifyToken(req);
    if (!user.customerId) {
        return res.status(403).json({ error: "Forbidden: only customers can place orders" });
    }    

    try {
        const customerId = user.customerId;
        const { restaurantId, price, items } = req.body;
        const order = await Order.create({
            restaurantId,
            customerId,
            customerName: user.name,
            regularStatus: 'New',
            deliveryStatus: 'Order Received',
            price,
            items
        });
        
        // Send order created event to Kafka
        await sendOrderCreatedEvent({
            orderId: order._id,
            customerId,
            customerName: user.name,
            restaurantId,
            price,
            items,
            regularStatus: order.regularStatus,
            deliveryStatus: order.deliveryStatus,
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({error: error.message});
    }
};

// update order status
exports.updateOrderStatus = async (req, res) => {
    // if (!req.session.restaurantId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }
    const user = verifyToken(req);
    if (!user.id) {
        return res.status(403).json({ error: "Forbidden: only restaurants can update orders" });
    }    

    try {
        const restaurantId = user.id;
        const orderId = new mongoose.Types.ObjectId(req.params.id);
        const { deliveryStatus } = req.body;

        let regularStatus = 'New';  // Default value for regularStatus
        if (deliveryStatus === 'Delivered') {
            regularStatus = 'Delivered';
        }
        
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, restaurantId },
            { deliveryStatus, regularStatus },
            { new: true }
        );
    
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json(updatedOrder);    
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({error: error.message});
    }
};