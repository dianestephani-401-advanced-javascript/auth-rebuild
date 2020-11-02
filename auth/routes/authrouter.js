'use strict';
const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basic');
const oauth = require('../middleware/oauth');

const users = require('../models/users-model');
// const axios = require('axios').default;
require('dotenv').config();

router.post('/signup', handleSignUp);
router.post('/signin', basicAuth, doTheSignIn);

router.get('/oauth', oAuthHandler);
router.get('/oauth-callback', oauth, callbackHandler);

async function oAuthHandler(req, res, next){
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
}

async function callbackHandler(req, res, next){

}

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