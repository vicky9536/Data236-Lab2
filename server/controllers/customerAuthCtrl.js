const bcrypt = require('bcryptjs');
// const Consumer = require('../models/consumer');
const { Customer } = require('../models');


// Customer signup
exports.customerSignup = async (req, res) => {
    try {
        const { name, email } = req.body;
        const hasedpassword = bcrypt.hashSync(req.body.password, 10);
        const customer = await Customer.create({
            name,
            email,
            password: hasedpassword
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
        const customer = await Customer.findOne({ where: { email } });
        if (customer && bcrypt.compare(password, customer.password)) {
            req.session.customer_Id = customer.id;
            console.log('Session Data: ', req.session);
            console.log("Customer ID:", req.session.customer_Id);
            res.status(200).json(customer);
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
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: "Error logging out"});
        }   
        console.log("Customer session destroyed");
        res.clearCookie('connect.sid');
        console.log('connect.sid cookie cleared.');
        res.status(200).json({message: "Logged out successfully"});
    });
};