var express = require("express");
var router = express.Router();
var request = require("sync-request");

const { default: mongoose } = require("mongoose");

const tesseract = require("node-tesseract-ocr");
const vision = require("@google-cloud/vision");


//Test tesseract

//ne pas oublier d'installer l'engine tesseract => brew install tesseract
//+packages langues => brew install tesseract-lang (attention, tres long )
router.get("/tesseract", async function (req, res, next) {


	// var text = await tesseract.recognize(
	// 	"https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
	// );


	// var image = "https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg"
	var image = "./tests/images/pizza.png"

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
	// res.json({ text });

});

//Test Cloud Vision
router.get("/cloud-vision", async function (req, res, next) {
	var image = "./tests/images/KO/recette_manuscrite.png"
	//Creates a client
	const client = new vision.ImageAnnotatorClient();

	// Performs label detection on the image file
	const [result] = await client.textDetection(
		image
	);
	const detections = result.textAnnotations;

	const justeLeTexte = detections[0].description
	console.log("Text:", justeLeTexte);


	res.json({ justeLeTexte });
});



router.get("/cloud-vision-doc", async function (req, res, next) {

	//Creates a client
	const client = new vision.ImageAnnotatorClient();

	// Performs label detection on the image file
	const [result] = await client.documentTextDetection("https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg");
	const fullTextAnnotation = result.fullTextAnnotation;

	const justeLeTexte = fullTextAnnotation.text


	console.log(`Full text: ${justeLeTexte}`);
	/* fullTextAnnotation.pages.forEach(page => {
	  page.blocks.forEach(block => {
		console.log(`Block confidence: ${block.confidence}`);
		block.paragraphs.forEach(paragraph => {
		  console.log(`Paragraph confidence: ${paragraph.confidence}`);
		  paragraph.words.forEach(word => {
			const wordText = word.symbols.map(s => s.text).join('');
			console.log(`Word text: ${wordText}`);
			console.log(`Word confidence: ${word.confidence}`);
			word.symbols.forEach(symbol => {
			  console.log(`Symbol text: ${symbol.text}`);
			  console.log(`Symbol confidence: ${symbol.confidence}`);
			});
		  });
		});
	  });
	}); */

	res.json({ justeLeTexte });
});





module.exports = router;
