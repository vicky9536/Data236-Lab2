'use strict';
const { Model } = require('sequelize');
const Customer = require('./customer');
const Restaurant = require('./restaurant');

module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {}

    Favorite.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customers',
                key: 'id'
            },
            field: 'customer_Id'
        },
        restaurant_Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
                key: 'id'
            },
            field: 'restaurant_Id'
        }
    },
    {
        sequelize,
        modelName: 'Favorite',
        tableName: 'favorites',
        timestamps: false
    }
    );

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Customer, { foreignKey: 'customer_Id' });
        Favorite.belongsTo(models.Restaurant, { foreignKey: 'restaurant_Id' });
    };

    return Favorite;
};
