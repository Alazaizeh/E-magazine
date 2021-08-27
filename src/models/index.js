"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secretstring";

const { Sequelize, DataTypes } = require("sequelize");

const articalesModel = require("./articales/model.js");
const users = require("./users/model");
const Collection = require("./data-collection.js");
const userModel = require("./users/model");

const DATABASE_URL =
  "postgres://pfwvsseb:nsW3ouLEURu7OyQ_rDA7sJ8s13aeOTt7@tai.db.elephantsql.com/pfwvsseb";

const sequelize = new Sequelize(DATABASE_URL);
const articales = articalesModel(sequelize, DataTypes);
const usersModel = users(sequelize, DataTypes);

// create our relations that will add 'foreign keys' to our tables
usersModel.hasMany(articales, {
  sourceKey: "id",
  foreignKey: "writerId",
});
articales.belongsTo(usersModel, {
  foreignKey: "writerId",
  targetKey: "id",
});

// const userClollection = new Collection(usersModel);
const articalesClollection = new Collection(articales);
module.exports = {
  db: sequelize,
  articales: articalesClollection,
  users: usersModel,
};
