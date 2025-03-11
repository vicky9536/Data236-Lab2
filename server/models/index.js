const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Customer = require('./customer')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Dish = require('./dish')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);

// associations
Restaurant.associate({ Dish, Order });
Dish.associate({ Restaurant, Cart });
Order.associate({ Customer, Restaurant });
Cart.associate({ Customer, Dish });
Favorite.associate({ Customer, Restaurant });
Customer.associate({ Order, Cart, Favorite });

sequelize.sync()
    .then(() => console.log("Database synchronized"))
    .catch(err => console.error("Database sync error:", err));

module.exports = {
    sequelize,
    Customer,
    Restaurant,
    Dish,
    Order,
    Cart,
    Favorite
};