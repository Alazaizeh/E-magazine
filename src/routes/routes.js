"use strict";

const express = require("express");
const authRouter = express.Router();

const { users, articales } = require("../models/index");
const basicAuth = require("../middleware/basic.js");
const bearerAuth = require("../middleware/bearer.js");
const permissions = require("../middleware/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);

    const output = {
      user: {
        _id: userRecord.id,
        username: userRecord.username,
      },
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get(
  "/users",
  bearerAuth(users),
  permissions("delete"),
  async (req, res, next) => {
    const userRecords = await users.findAll({});
    const list = userRecords.map((user) => user.username);
    res.status(200).json(list);
  }
);

authRouter.get(
  "/articales",
  bearerAuth(users),
  permissions("delete"),
  async (req, res, next) => {
    console.log(articales);
    const userRecords = await articales.findAll({});

    res.status(200).json(userRecords);
  }
);
authRouter.post(
  "/create",
  bearerAuth(users),
  permissions("create"),
  async (req, res) => {
    try {
      let userRecord = await articales.create(req.body);

      res.status(201).json(userRecord);
    } catch (e) {
      next(e.message);
    }
  }
);
authRouter.get("/secret", bearerAuth(users), async (req, res, next) => {
  res.status(200).send("Welcome to the secret area");
});
authRouter.put(
  "/update/:id",
  bearerAuth(users),
  permissions("update"),
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      console.log("xxxxxxxxxxxxxxxxxxxxx");
      console.log(id, req.body);
      console.log("xxxxxxxxxxxxxxxxxxxxx");

      let record = await articales.findOne({ where: { id } });
      let updateRecord = await record.update(req.body);
      res.status(200).json(updateRecord);
    } catch (error) {
      res.status(200).json("Error");
    }
  }
);

authRouter.delete(
  "/delete/:id",
  bearerAuth(users),
  permissions("delete"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let record = await articales.destroy({ where: { id } });
    res.status(200).json(record);
  }
);

module.exports = authRouter;
