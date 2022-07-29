var express = require('express');
var router = express.Router();


//---- ROUTE RECHERCHE PAR TAGS - GET onPress
//DONNEES d'ENTREE: tableau de chips/tags selected
//DONNEES DE SORTIE:tableau de recettes qui contiennent ces tags [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get('/search-tags', function (req, res, next) {
	res.send('respond with a resource');
});

//---- ROUTE RECHERCHE TEXTUELLE - POST sur TouchableOpacity Magnify
//DONNEES d'ENTREE: req.body.searchItem (string)
//traitement : recherche BDD sur searchItem dans direction/ingredients/title
//DONNEES DE SORTIE:tableau de recettes qui contiennent le searchItem dans direction/ingredients/title [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get('/search-name', function (req, res, next) {
	res.send('respond with a resource');
});



module.exports = router;
