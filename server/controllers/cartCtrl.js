const { Cart } = require('../models');
const { Customer } = require('../models');
const { Dish } = require('../models');
const { Order } = require('../models');

// review cart
exports.getCart = async (req, res) => {
    /*
    if (!req.session.customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    try {
        // const customer_Id = req.session.customer_Id;
        const customer_Id = req.params.customer_Id;
        const cartItems = await Cart.findAll({
            where: { customer_Id },
            include: [{ model: Dish }]
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({error: error.message});
    }
};

// add dish to cart
exports.addCart = async (req, res) => {
    /*
    if (!req.session.customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */

    try {
        const { dish_Id, quantity, restaurant_Id } = req.body;
        const customer_Id = req.params.customer_Id;
        const cartItem = await Cart.create({
            dish_Id,
            quantity,
            restaurant_Id,
            customer_Id
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({error: error.message});
    }
};

// delete dish from cart
exports.deleteCart = async (req, res) => {
    /*
    if (!req.session.customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */
    try {
        const customer_Id = req.params.customer_Id;
        const dish_Id = req.params.dish_Id;
        const deleted = await Cart.destroy({
            where: { id: dish_Id, customer_Id: customer_Id }
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
    /*
    if (!req.session.customer_Id) {
        return res.status(401).json({error: "Unauthorized"});
    }
    */

    try {
        const customer_Id = req.params.customer_Id;
        const cartItems = await Cart.findAll({
            where: { customer_Id },
            include: [{ model: Dish }]
        });
        console.log("Cart Items:", cartItems);

        const orderItems = cartItems.map(item => ({
            dish_Id: item.dish_Id,
            name: item.Dish.name,
            quantity: item.quantity,
            price: item.Dish.price,
        }));
        const totalPrice = cartItems.reduce((total, item) => total + (item.Dish.price * item.quantity), 0);

        const order = await Order.create({
            customer_Id: customer_Id,
            restaurant_Id: cartItems[0].restaurant_Id,
            price: totalPrice,
            status: 'New',
            items: JSON.stringify(orderItems)
        });
        await Cart.destroy({ where: { customer_Id } });
        res.status(200).json(order);
    } catch (error) {
        console.error("Error checking out:", error);
        res.status(500).json({error: error.message});
    }
};