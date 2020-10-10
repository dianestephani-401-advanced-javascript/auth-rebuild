'use strict';
const express = require('express');
const cors = require('cors');
const authrouter = require('./auth/routes/authrouter');
const notFoundHandler = require('./middleware/400');
const errorHandler = require('./middleware/500');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//make a 404 and 500 handler

app.use(authrouter);
app.get('/', (req, res) => {console.log('I am ALIIIIIIIIVE')} )
app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  app,
 start: (port) => app.listen(port, console.log(`Up on port ${port}! NEAT!`))
}