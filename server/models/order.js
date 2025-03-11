'use strict';
const { Model } = require('sequelize');
const Customer = require('./customer');
const Restaurant = require('./restaurant');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {}

    Order.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        restaurant_Id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        customer_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'customer_Id'
        },
        status: {
            type: DataTypes.ENUM(
                'New',
                'Delivered',
                'Cancelled',
                'Order Received',
                'Preparing',
                'On the Way',
                'Pick-up Ready',
                'Picked Up'
            ),
            defaultValue: 'New',
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false
    }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.Restaurant, { foreignKey: 'restaurant_Id' });
        Order.belongsTo(models.Customer, { foreignKey: 'customer_Id' });
    };

    return Order;
};