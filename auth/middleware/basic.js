'use strict';

const base64 = require('base-64')
const user = require('../models/users-model');

module.exports = async (req, res, next)=> {
  try{
    let authorization = req.headers.authorization;
    let encoded = authorization.split(' ')[1];
    let decoded = base64.decode(encoded);
    let [username, password] = decoded.split(':');
    let userRecord = await user.validate(username, password);
    req.token = userRecord.generateToken();
    req.user = userRecord;
    console.log(userRecord, username, password)
    next();
  }
  catch(err) {
    next('invalid login, dingus!');
  }
}