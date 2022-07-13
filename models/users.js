var mongoose = require('mongoose')

var recipeSchema = mongoose.Schema({
    name: String,
    img: String,
    ingredients: Array,
    process: String
   });

var userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    likedrecipes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
    personalrecipes : recipeSchema
});


module.exports = mongoose.model('users', userSchema);