var functions = require('./functions');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var queryString = req.query;
  var splittedString = functions.splitString(queryString.q, ',');

  functions.getPriceFromMkm(splittedString[0], function(cardName, cardPrice){
      res.send(cardPrice);
  });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
