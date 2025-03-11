'use strict';
const { Model } = require('sequelize');
const Restaurant = require('./restaurant');

module.exports = (sequelize, DataTypes) => {
    class Dish extends Model {}

    //Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' });
    //Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

    Dish.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'restaurants',
                key: 'id'
            },
            field: 'restaurant_Id'
        }
    },
    {
        sequelize,
        modelName: 'Dish',
        tableName: 'dishes',
        timestamps: false
    }
    );

    Dish.associate = (models) => {
        Dish.belongsTo(models.Restaurant, { foreignKey: 'restaurant_Id' });
        Dish.hasMany(models.Cart, { foreignKey: 'dish_Id' });
    };

    return Dish;
};

