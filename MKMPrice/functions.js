var http = require('http');

function splitString(stringToSplit, separator) {
  return stringToSplit.split(separator);
}

function getPriceFromMkm(cardName, cb) {

    http.get('http://mkmprovider:3002/price?name=' + cardName, (res) => {
        var d = '';
        res.on('data', function (chunk) {
            d += chunk;
        });

        res.on('end', function () {
            var o = JSON.parse(d);
            cb(cardName, o);
        });

    });
}

module.exports = {
    splitString: splitString,
    getPriceFromMkm: getPriceFromMkm
};
