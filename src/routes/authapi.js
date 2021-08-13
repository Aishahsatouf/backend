'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users');
const basicAuth = require('../middleware/auth/basic')


authRouter.post('/signup', async (req, res, next) => {
  try {
    const {username,email,password}=req.body
    console.log(User);
    let user = new User({username,email,password});
     user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.log(e)
    next(e)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});


module.exports = authRouter;