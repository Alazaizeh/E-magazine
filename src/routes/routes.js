'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index');
const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {

    let userRecord = await users.create(req.body);
    
    const output = {
      user:{
        _id:userRecord.id,
        username:userRecord.username
      },
      token:userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});



authRouter.get('/users', bearerAuth(users), permissions('delete'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});


authRouter.get('/secret', bearerAuth(users), async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});
authRouter.post('/create', bearerAuth(users), permissions('create'), (req, res) => {
  res.status(200).json(req.body);
});

authRouter.put('/update', bearerAuth(users), permissions('update'), (req, res) => {
  res.status(200).send('Ok! I have update permissions');
});

authRouter.delete('/delete', bearerAuth(users), permissions('delete'), (req, res) => {
  res.status(200).send('Ok! I have delete permissions');
});

module.exports = authRouter;
