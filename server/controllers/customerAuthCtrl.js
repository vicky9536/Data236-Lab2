const bcrypt = require('bcryptjs');
// const Consumer = require('../models/consumer');
const { Customer } = require('../models');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Customer signup
exports.customerSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // const hashedpassword = bcrypt.hashSync(req.body.password, 10);
        const customer = await Customer.create({
            name,
            email,
            password
        });
        res.status(201).json(customer);
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({error: error.message});
    }
};

// Customer login
exports.customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });
        if (customer && bcrypt.compareSync(password, customer.password)) {
            const payload = { customerId: customer._id, name: customer.name }; 
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            
            res.status(200).json({ token: token, customer: {
                _id: customer._id,
                name: customer.name,
                email: customer.email,

            } });
        } else {
            res.status(401).json({error: "Invalid credentials"});
        }
    } catch (error) {
        console.error("Error logging in customer:", error);
        res.status(500).json({error: error.message});
    }
};

// Customer logout
exports.customerLogout = async (req, res) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         return res.status(500).json({error: "Error logging out"});
    //     }
    //     res.status(200).json({message: "Logged out successfully"});
    // });
    res.status(200).json({message: "Logged out successfully"});
};