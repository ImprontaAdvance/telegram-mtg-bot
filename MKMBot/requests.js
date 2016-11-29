const request = require('request');

const ENDPOINT = 'http://mkmprovider:3002';

function getCardPrice(card, priceType) {
    return new Promise(function(resolve, reject) {
        request(`${ENDPOINT}/price?name=${card.trim()}`, function(err, res, body) {
            if(err)
                return reject(err);

            if(res.statusCode === 404) {
                return reject({
                    message: 'Oops, I cannot found  the card. Are you sure name e/or syntax are correct?',
                });
            }

            try {
                var prices = JSON.parse(body).splice(0, 8).map(function(el) {
                    return `\n${el.names[0]} - ${el.expansion} - ${el.prices[priceType]} €`;
                }).join('');
                resolve({prices});
            } catch (e) {
                rej(e);
            }
        });
    });
}

module.exports = {
    getCardPrice,
};
