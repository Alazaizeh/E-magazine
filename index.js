"use strict";
const { db } = require("./src/models");
const server = require("./src/server.js");
const PORT = 4000;
db.sync().then(() => {
  server.start(PORT);
});
