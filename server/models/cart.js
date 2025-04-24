// cart.js
'use strict';
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
