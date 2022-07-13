var express = require('express');
var router = express.Router();
var request = require('sync-request');

const { default: mongoose } = require('mongoose');

const tesseract = require("node-tesseract-ocr")





//Test tesseract
router.get('/ocr', async function(req, res, next) {

  
 


var text = await tesseract.recognize("https://picturetherecipe.com/wp-content/uploads/2013/07/Picture-The-Recipe-Tips-Muffin-tin-for-stuffed-veggies.jpg")

  res.json({text})
});





module.exports = router;
