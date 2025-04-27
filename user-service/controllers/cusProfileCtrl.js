const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
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

// view customer profile
exports.viewCusProfile = async (req, res) => {
    try {
        const user = verifyToken(req);
        const customerId = user.id;

        const customer = await Customer.findById(customerId).select('-password');
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        res.status(500).json({ error: error.message });
    }
};

// update consumer profile
exports.updateCusProfile = async (req, res) => {
    // console.log("Received request to update consumer profile:", req.session.consumerId);
    // if (!req.session.consumerId) {
    //     return res.status(401).json({error: "Unauthorized"});
    // }
    try {
        const user = verifyToken(req); 
        const customerId = user.id;

        const { name, email, state, country, description, profilePic } = req.body;

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.state = state || customer.state;
        customer.country = country || customer.country;
        if (description !== undefined && description !== null) {
            customer.description = description;
        }
        customer.profilePic = profilePic || customer.profilePic;

        await customer.save();

        console.log("Updated customer profile:", customer);
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: error.message });
    }
};
