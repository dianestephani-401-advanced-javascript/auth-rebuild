'use strict';
const bcrypt = require('bcrypt');

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

 //saving users goes here

 module.exports = mongoose.model('users', user);