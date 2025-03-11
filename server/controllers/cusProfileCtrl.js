const { Customer } = require('../models');
const bcrypt = require('bcryptjs');

// view consuumer profile
exports.viewCusProfile = async (req, res) => {
    try {
        const customer_Id = req.params.id;
        console.log("Received request to fetch customer profile:", customer_Id);
        const customer = await Customer.findByPk(customer_Id);
        if (!customer) {
            return res.status(404).json({error: "Customer not found"});
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        res.status(500).json({error: error.message});
    }
};

// update customer profile
exports.updateCusProfile = async (req, res) => {
    const customer_Id = req.params.id;
    console.log("Received request to update customer profile:", req.params.id);
    try {
        const { name, email, state, country, img_url, description } = req.body;
        console.log("customer_Id:", customer_Id);
        const customer = await Customer.findByPk(customer_Id);
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        customer.name = name;
        customer.email = email;
        customer.state = state;
        customer.country = country;
        customer.img_url = img_url;
        customer.description = description;
        
        await customer.save();
        console.log("Customer profile updated successfully:", customer);
        res.status(200).json(customer);
    } catch (error) {
        console.error("Error updating customer profile:", error);
        res.status(500).json({ error: error.message });
    }
};
