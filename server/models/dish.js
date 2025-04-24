// dish.js
'use strict';
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
}, {
    timestamps: false
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
