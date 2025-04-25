// consumer.js
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        default: ''
    },
    state: String,
    country: String
}, {
    timestamps: true 
});

// Hash password
customerSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Define relationships
customerSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customerId'
});
customerSchema.virtual('carts', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'customerId'
});
customerSchema.virtual('favorites', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'customerId'
});

// Make virtuals part of toJSON output
customerSchema.set('toObject', { virtuals: true });
customerSchema.set('toJSON', { virtuals: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
