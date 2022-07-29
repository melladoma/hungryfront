var express = require("express");
var router = express.Router();
var request = require("sync-request");

const { default: mongoose } = require("mongoose");

const tesseract = require("node-tesseract-ocr");
const vision = require("@google-cloud/vision");

//-------ROUTE TESSERACT - POST
router.post("/tesseract", async function (req, res, next) {
    res.send('respond with a resource');
})
//DONNEES d'ENTREE: uri photo  req.body.photoUri
//TRAITEMENT : transfo text en objet
//DONNEES DE SORTIE: objet form{title,ingredients, direction, persons, cookingTime, prepTime, tags}


//------ROUTE URL SCRAPPER-POST
router.post("/url-scrapper", async function (req, res, next) {
    res.send('respond with a resource');
})
//DONNEES d'ENTREE: uri photo  req.body.photoUri
//TRAITEMENT: ???
//DONNEES DE SORTIE:objet form{title,ingredients, direction, persons, cookingTime, prepTime, tags}


//---Test route tesseract

//ne pas oublier d'installer l'engine tesseract => brew install tesseract
//+packages langues => brew install tesseract-lang (attention, tres long )
router.get("/tesseract", async function (req, res, next) {

    // var text = await tesseract.recognize(
    // 	"https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
    // );


    // var image = "https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
    var image = "./tests/images/nouilles2.png"

    const config = {
        lang: "fra",
        oem: 3,
        psm: 3,
    }
    tesseract
        .recognize(image, config)
        .then((text) => {
            console.log("Result:", text)
            res.json({ text });
        })
        .catch((error) => {
            console.log(error.message)
            res.json({ message: "err" });
        })

});


module.exports = router;