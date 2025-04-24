// models/index.js
const Customer = require('./customer');
const Restaurant = require('./restaurant');
const Dish = require('./dish');
const Order = require('./order');
const Cart = require('./cart');
const Favorite = require('./favorite');

module.exports = {
    Customer,
    Restaurant,
    Dish,
    Order,
    Cart,
    Favorite
};
