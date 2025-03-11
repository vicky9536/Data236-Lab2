const { Order } = require('../models');

// view order
exports.viewOrder = async (req, res) => {
    /*
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const restaurant_Id = req.params.restaurant_Id;
    try {
        const order = await Order.findAll({
            where: {restaurantId: restaurant_Id}
        });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({error: error.message});
    }
}

exports.viewOrder = async (req, res) => {
    /*
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const restaurant_Id = req.params.restaurant_Id;
    try {
        const order = await Order.findAll({
            where: {restaurant_Id: restaurant_Id}
        });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({error: error.message});
    }
}

// create a new order
exports.createOrder = async (req, res) => {
    /*
    if (!req.session.customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const customer_Id = req.params.customer_Id;
    try {
        const { restaurant_Id, price } = req.body;
        const order = await Order.create({
            restaurant_Id,
            customer_Id: customer_Id,
            status: 'New',
            price
        });
        res.status(201).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({error: error.message});
    }
};

// update order status
exports.updateOrderStatus = async (req, res) => {
    /*
    if (!req.session.restaurantId) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    const restaurant_Id = req.params.restaurant_Id;
    const order_Id = req.params.order_Id;
    try {
        const { status } = req.body;
        const [updated] = await Order.update({ status }, {
            where: { id: order_Id, restaurant_Id: restaurant_Id }
        });
        if (updated) {
            const updatedOrder = await Order.findOne({ 
                where: { id: order_Id, restaurant_Id: restaurant_Id } 
            });
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({error: error.message});
    }
};