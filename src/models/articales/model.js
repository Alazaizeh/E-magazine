"use strict";

const articaleModel = (sequelize, DataTypes) =>
  sequelize.define("Articles", {
    title: { type: DataTypes.STRING, required: true },
    text: { type: DataTypes.STRING, required: true },
    catgory: {
      type: DataTypes.ENUM("fashion", "nutrition", "beauty"),
      required: true,
    },
    writerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = articaleModel;
