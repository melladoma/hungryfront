var mongoose = require('mongoose')


var recipeSchema = mongoose.Schema({
    name: String,
    img: String,
    ingredients: Array,
    process: String
  });
  
  module.exports = mongoose.model('recipes', recipeSchema);


