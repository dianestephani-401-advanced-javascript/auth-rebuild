'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//schema to enforce shape of data going into DB
 const mongoose = require('mongoose');
 let user = mongoose.Schema({
   username: {
     type: String,
     required: true,
     unique: true,
   },
   password: {
     type: String,
     required: true,
   }
 });

 user.pre('save', async function(){
   this.password = await bcrypt.hash(this.password, 5);
 })

 user.methods.generateToken = function(){
  let tokenObject = {
    username: this.username,
  }
 let token = jwt.sign(tokenObject, process.env.SECRET);
 return token;
 };

 user.statics.validate = async function(un, pw){
  let userRecord = await this.findOne({
    username: un,
  });
  let isValid = await bcrypt.compare(pw, userRecord.password);
  if(isValid){
    return userRecord;
  }
  else{
    return undefined;
  }
 }

 module.exports = mongoose.model('users', user);