var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

//---- ROUTE AFFICHAGE HOMESCREEN - GET - USEEFFECT d'INITIALISATION
//DONNEES d'ENTREE: token user
//TRAITEMENT : recherche BDD recipesAdded user
//DONNEES DE SORTIE:tableau de recettes du user [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]

router.get('/get-myrecipes', function (req, res, next) {
	res.send('respond with a resource');
});

//----- ROUTE AFFICHAGE FEED - GET USEEFFECT d'INITIALISATION
//DONNEES d'ENTREE: /
//TRAITEMENT : recherche BDD recettes publiques
//DONNEES DE SORTIE:tableau de recettes publiques [{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,comments,likeCount,privateStatus}]
router.get('/get-feed', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE VALIDATION FICHE RECETTE -POST ONPRESS

//DONNEES d'ENTREE: objet validatedForm{title,ingredients,direction,persons,cookingTime,prepTime,tags,author,picture,privateStatus}
//TRAITEMENT : envoi en BDD
//DONNEES DE SORTIE: result true/false sur enregistrement BDD recette

router.post('/validate-form', function (req, res, next) {
	res.send('respond with a resource');
});
module.exports = router;


//ROUTE SHOPP
