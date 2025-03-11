'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {}

    Restaurant.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        contact_info: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timings: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Restaurant',
        tableName: 'restaurants',
        timestamps: false,
        hooks: {
            beforeCreate: async (customer) => {
                if (customer.password) {
                    customer.password = await bcrypt.hash(customer.password, 10);
                }
            }
        }
    }
    );

    Restaurant.associate = (models) => {
        Restaurant.hasMany(models.Dish, { foreignKey: 'restaurant_Id' });
        Restaurant.hasMany(models.Order, { foreignKey: 'restaurant_Id' });
    };

    return Restaurant;
};