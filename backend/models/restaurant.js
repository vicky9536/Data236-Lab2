// restaurant.js
'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    contact_info: {
        type: String
    },
    image_url: {
        type: String
    },
    timings: {
        type: String
    }
}, {
    timestamps: false
});

restaurantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

restaurantSchema.virtual('dishes', {
    ref: 'Dish',
    localField: '_id',
    foreignField: 'restaurantId'
});

restaurantSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'restaurantId'
});

restaurantSchema.set('toObject', { virtuals: true });
restaurantSchema.set('toJSON', { virtuals: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
