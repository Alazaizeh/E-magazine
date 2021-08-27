"use strict";
const base64 = require("base-64");
const { users } = require("../models/index");

class Collection {
  constructor(model) {
    // the mddel should be a valid sequelize model
    this.model = model;
  }

  async create(req) {
    let modelInfo = req.body;
    modelInfo.writerId = req.user.dataValues.id;
    console.log(modelInfo);
    let record = await this.model.create(modelInfo);
    return record;
  }

  async get(id) {
    let record = await this.model.findOne({ where: { id: id } });
    return record;
  }

  async getAll() {
    let all = await this.model.findAll();
    return all;
  }

  async update(id, modelInfo) {
    let record = await this.model.findOne({ where: { id } });
    let updateRecord = await record.update(modelInfo);
    return updateRecord;
  }

  async delete(id) {
    let record = await this.model.destroy({ where: { id } });
    return record;
  }
}

module.exports = Collection;
