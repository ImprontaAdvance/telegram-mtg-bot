var http = require('http');

function splitString(stringToSplit, separator) {
  return stringToSplit.split(separator);
}

function getPriceFromMkm(cardName, cb) {

    http.get({
        hostname: 'localhost',
        port: 3002,
        path: '/price?q=' + cardName,
        agent: false
    }, (res) => {
        return cb(cardName, res.body);
    })
}

module.exports = {
    splitString: splitString,
    getPriceFromMkm: getPriceFromMkm
};
