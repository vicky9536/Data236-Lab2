'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {}

    Customer.init({
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
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        hooks: {
            beforeCreate: async (customer) => {
                if (customer.password) {
                    customer.password = await bcrypt.hash(customer.password, 10);
                }
            }
        }
    }
    );

    Customer.associate = (models) => {
        Customer.hasMany(models.Order, { foreignKey: 'customer_Id' });
        Customer.hasMany(models.Cart,  { foreignKey: 'customer_Id' });
        Customer.hasMany(models.Favorite, { foreignKey: 'customer_Id' });
    };
    
    return Customer;
};