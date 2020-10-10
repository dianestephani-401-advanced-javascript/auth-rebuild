'use strict';
const express = require('express');
const router = express.Router();

const users = require('../models/users-model');

router.post('/signup', handleSignUp);
router.post('/signin');

async function handleSignUp(req, res, next){
try {
  let obj = {
    username: req.body.username,
    password: req.body.password,
  }
  let record = new users(obj);
  let userRecord = await record.save();
  console.log(userRecord);
  res.status(200).json(obj);
}
catch(err)
{
  next(err.message);
}
}

module.exports = router;