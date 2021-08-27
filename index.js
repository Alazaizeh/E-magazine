"use strict";
require("dotenv").config();
const { db } = require("./src/models");
const server = require("./src/server.js");
const PORT = process.env.PORT || 4000;
db.sync().then(() => {
  server.start(PORT);
});
