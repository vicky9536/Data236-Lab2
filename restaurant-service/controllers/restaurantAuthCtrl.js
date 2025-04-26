//const Restaurant = require('../models/restaurant');
const bcrypt = require('bcryptjs');
const Restaurant = require('../models/restaurant');  
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Restaurant signup
exports.restaurantSignup = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        // const hashedpassword = bcrypt.hashSync(req.body.password, 10);
        const restaurant = await Restaurant.create({
            name,
            email,
            password,
            location
        });
        res.status(201).json(restaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({error: error.message});
    }
};

// Restaurant login
exports.restaurantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const restaurant = await Restaurant.findOne({ email });
        if (restaurant && await bcrypt.compare(password, restaurant.password)) {
            const payload = { id: restaurant._id, name: restaurant.name }; 
            const token = jwt.sign(payload, secret, { expiresIn: "1h" });
            res.status(200).json({ token: token });
        } else {
            res.status(401).json({error: "Invalid credentials"});
        }
    } catch (error) {
        console.error("Error logging in restaurant:", error);
        res.status(500).json({error: error.message});
    }
};

// Restaurant logout
exports.restaurantLogout = async (req, res) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         return res.status(500).json({error: "Error logging out"});
    //     }
    //     res.status(200).json({message: "Logged out successfully"});
    // });
    res.status(200).json({message: "Logged out successfully"});
};