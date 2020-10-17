//Copied from class 14 demo code and modified for our needs

'use strict';
const fs = require('fs'); //built in to read and manipulate file system on computer
const util = require('util'); //utility to help with console logging *?
const readdir = util.promisify(fs.readdir); 
const modelsFolder = '/Users/dianestephani/Documents/Code-Fellows/401/labs/auth-rebuild/api/models'; //Assigning a variable that points to where we store our models
/**
 * Model Finder Middleware
 * @module middleware/model-finder
 */
/**
 * Model Finder Middleware
 * Evaluates req.params.model (i.e. /api/v1/:model/) and returns an instance of the specified model.
 * Because node require is cached, the instance will only be created once, no matter how many times a model is called for.
 * In the event the model is not found, node will throw a "MODULE_NOT_FOUND" error which the error middleware in the server will pick up.
 * @param req {object} Express Request Object
 * @param res {object} Express Response Object
 * @param next {function} Express middleware next()
 */
const load = (req, res, next) => {
  const modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const fileName = `${modelsFolder}/${modelName}/${modelName}-model.js`;
  const Model = require(fileName);
  req.model = new Model();
  next();
};
const list = () => {
  return readdir(modelsFolder)
    .then(contents =>
      contents.filter((entry) =>
        fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`)
      )
    )
    .catch(console.error);
};
module.exports = { load, list };