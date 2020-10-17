'use strict';
const Model = require('../mongocollection');
const schema = require('../products/products-schema');

class Products extends Model{
  constructor(){
    super(schema);
  }
}

module.exports = Products;