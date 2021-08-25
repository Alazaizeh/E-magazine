'use strict';
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');

const foodModel = require('./articales/model.js');
const usersModel=require('./users/model');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);



module.exports = {
  db: sequelize,
  food: new Collection(food),
 
  users: usersModel(sequelize,DataTypes),
};