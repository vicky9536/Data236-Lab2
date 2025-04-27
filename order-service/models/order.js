'use strict';
const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
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
    customerName: {
        type: String,
        required: true
    },
    regularStatus:{
        type: String,
        enum:[
            'New',
            'Delivered',
            'Cancelled',
        ],
        default: 'New',
        required: true
    },
    deliveryStatus:{
        type: String,
        enum:[
            'Order Received',
            'Preparing',
            'On the way',
            'Pick-up Ready',
            'Picked Up'
        ],
        default: 'Order Received',
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
