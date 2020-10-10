'use strict';
const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basic');
const users = require('../models/users-model');

router.post('/signup', handleSignUp);
router.post('/signin', basicAuth, doTheSignIn);

async function handleSignUp(req, res, next){
try {
  let obj = {
    username: req.body.username,
    password: req.body.password,
  }
  let record = new users(obj);
  let token = record.generateToken();
  let userRecord = await record.save();
  let output = {
    token: token,
    user: userRecord,
  }
  res.status(200).json(output);
}
catch(err)
{
  next(err.message);
}
};

async function doTheSignIn(req, res, next){
  let output = {
    token: req.token,
    user: req.user,
  }
  res.status(200).json(output);
}

module.exports = router;