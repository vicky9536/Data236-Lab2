'use strict';
const { Model } = require('sequelize');
const Customer = require('./customer');
const Dish = require('./dish');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {}

    Cart.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'id'
            },
            field: 'restaurant_Id'
        },
        customer_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customers',
                key: 'id'
            }
        },
        dish_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Dishes',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Cart',
        tableName: 'carts',
    }
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.Customer, { foreignKey: 'customer_Id' });
        Cart.belongsTo(models.Dish, { foreignKey: 'dish_Id' });
    };

    return Cart;
};
