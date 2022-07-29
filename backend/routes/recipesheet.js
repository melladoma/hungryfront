var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE AJOUT A recipesAdded HOMESCREEN
//DONNEES ENTREES: req.body.idRecipe
//DONNEES SORTIE : result true false recette ajoutee a AddedList User en BDD
router.post('/add-recipe', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE LIKE : AJOUT A recipesLiked 
//DONNEES ENTREES: req.body.idRecipe
//DONNEES SORTIE : result true false recette ajoutee a LikedList User en BDD
router.post('/like-recipe', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE MODIF FICHE RECETTE
//DONNEES ENTREE : inputs recette
//DONNEES SORTIE : result true false modif BDD
router.post('/modify-recipe', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE DELETE FICHE RECETTE
//DONNEES ENTREE : inputs recette
//DONNEES SORTIE : result true false modif BDD
router.post('/delete-recipe', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE AJOUT A LA SHOPPING LIST
//DONNEES ENTREE : ingedrients recette req.body.ingredients
// TRaitement BDD : ajout quantites globales dans BDD
//DONNEES SORTIE : [{ingredient:totalquantite}]
router.post('/addToShoppingList', function (req, res, next) {
	res.send('respond with a resource');
});

//ROUTE AJOUT AU SEMAINIER
//DONNEES ENTREE : idrecette 
//DONNEES SORTIE : [liste recettes]
router.post('/addToWeeklyList', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;