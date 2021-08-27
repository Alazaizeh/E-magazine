"use strict";

const base64 = require("base-64");
const { users } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);

    const output = {
      _id: userRecord.id,
      username: userRecord.username,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
};
