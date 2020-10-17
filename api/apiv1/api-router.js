'use strict';
const express = require('express');
const router = express.Router();

router.get('/test', ()=> {
  console.log('I am aliiiiiiiiiive!')
});

//Require in modelfinder, 
//Declare a route dynamically
//Fill in that route with our modelfinder
module.exports = router;