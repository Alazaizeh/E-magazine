'use strict';

const articaleModel = (sequelize, DataTypes) => sequelize.define('Articale', {
  title: { type: DataTypes.STRING, required: true },
  text: { type: DataTypes.STRING, required: true },
  catgory: { type: DataTypes.ENUM('fashion', 'nutrition', 'beauty'), required: true }
});

module.exports = articaleModel;