"use strict";

const express = require("express");
const authRouter = express.Router();

const { users, articales } = require("../models/index");
const basicAuth = require("../middleware/basic.js");
const bearerAuth = require("../middleware/bearer.js");
const signUpAuth = require("../middleware/signUp.js");
const permissions = require("../middleware/acl.js");

authRouter.post("/signup", signUpAuth, async (req, res, next) => {});

authRouter.post("/signin", basicAuth, (req, res, next) => {});

authRouter.get(
  "/users",
  bearerAuth(users),
  permissions("delete"),
  async (req, res, next) => {
    const usersRec = await users.getAll();
    res.status(200).json(usersRec);
  }
);

authRouter.get("/articales", async (req, res, next) => {
  const userRecords = await articales.getAll();
  res.status(200).json(userRecords);
});

authRouter.post(
  "/create",
  bearerAuth(users),
  permissions("create"),
  async (req, res) => {
    let userRecord = await articales.create(req);
    res.status(201).json(userRecord);
  }
);

authRouter.put(
  "/update/:id",
  bearerAuth(users),
  permissions("update"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let updateRecord = await articales.update(id, req.body);
    res.status(200).json(updateRecord);
  }
);

authRouter.delete(
  "/delete/:id",
  bearerAuth(users),
  permissions("delete"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let record = await articales.delete(id);
    res.status(200).json(record);
  }
);

authRouter.delete(
  "/deleteusers/:id",
  bearerAuth(users),
  permissions("delete"),
  async (req, res) => {
    const id = parseInt(req.params.id);
    let record = await users.deleteUser(id);
    res.status(200).json(record);
  }
);

module.exports = authRouter;
