'use strict';
const express = require('express');
const router = express.Router();
const modelfinder = require('../middleware/modelfinder');

router.param('model', modelfinder.load);

router.get('/test', ()=> {
  console.log('I am aliiiiiiiiiive!')
});

router.post('/:model', handlePost)

async function handlePost(req, res, next){
  let record = await req.model.create(req.body);
  res.status(200).json(record);
}

//Require in modelfinder, 
//Declare a route dynamically
//Fill in that route with our modelfinder
module.exports = router;

//declare routes for delete