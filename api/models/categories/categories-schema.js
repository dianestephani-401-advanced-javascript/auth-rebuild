'use strict';
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

let categories = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('categories', categories);


