'use strict';
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

class Model {
  constructor(schema){
    this.schema = schema;
  }

  async add(){
    const newRecord = await this.schema.save();
    return newRecord;
  }

  create(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  test(){
    console.log(this.schema);
    console.log('This worked! WOW!')
  }  
}

module.exports = Model;

//write the methods for delete in collection