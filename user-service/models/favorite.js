// favorite.js
'use strict';
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
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

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
