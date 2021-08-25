"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const articalesModel = require("./articales/model.js");
const usersModel = require("./users/model");
const Collection = require("./data-collection.js");

const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const articales = articalesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  articales: articalesModel(sequelize, DataTypes),
  users: usersModel(sequelize, DataTypes),
};
