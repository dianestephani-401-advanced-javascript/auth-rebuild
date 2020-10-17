'use strict';
const Model = require('../mongocollection');
const schema = require('../categories/categories-schema');

class Categories extends Model {
  constructor(){
    super(schema);
  }
}

//We created our categories schema and imported. The mongocollection file will contain all of our declared CRUD methods that we import here as Model. Then we created a class called Categories that extends the Model, so when we pass in the schema, the CRUD methods we set will be applicable to the instsance of our data. Instance of a model = a Document.

module.exports = Categories;