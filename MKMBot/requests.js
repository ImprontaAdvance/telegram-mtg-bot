const request = require('request');

const ENDPOINT = 'http://mkmprovider:3002';

function getCardPrice(card, priceType) {
    return new Promise(function(resolve, reject) {
        request(`${ENDPOINT}/price?name=${card.trim()}`, function(err, res, body) {
            if(err)
                return reject(err);

            if(res.statusCode === 404) {
                return reject({
                    message: 'Oops, I cannot found  the card. Are you sure name and/or syntax are correct?',
                });
            }

            try {
                var prices = JSON.parse(body).splice(0, 8).map(function(el) {
                    return `\n${el.names[0]} - ${el.expansion} - ${el.prices[priceType]} €`;
                });
                resolve({prices});
            } catch (e) {
                reject(e);
            }
        });
    });
}

function getMkmCardLink(card) {
    return new Promise(function(resolve, reject) {
        request(`${ENDPOINT}/price?name=${card.trim()}`, function(err, res, body) {
            if(err)
                return reject(err);

            if(res.statusCode === 404) {
                return reject({
                    message: 'Oops, I cannot found  the card. Are you sure name and/or syntax are correct?',
                });
            }

            try {
                var cards = JSON.parse(body).splice(0, 4).map(function(el) {
                    return {
                        link: `https://it.magiccardmarket.eu/Products/Singles/${encodeURIComponent(el.expansionMkm)}/${encodeURIComponent(el.names[0])}`,
                        name: el.names[0],
                        expansion: el.expansion,
                    };
                });
                resolve(cards);
            } catch (e) {
                reject(e);
            }
        });
    });
}

function getCardGroupName(card, priceType) {
    return new Promise(function(resolve, reject) {
        request(`${ENDPOINT}/price?name=${card.trim()}`, function(err, res, body) {
            if(err)
                return reject(err);

            if(res.statusCode === 404) {
                return reject({
                    message: 'Oops, I cannot found  the card. Are you sure name and/or syntax are correct?',
                });
            }

            try {
                var names = {};
                JSON.parse(body).forEach(function(el) {
                    if(!names.hasOwnProperty(el.names[0]))
                        names[el.names[0]] = [];

                    names[el.names[0]].push(`\n${el.names[0]} - ${el.expansion} - ${el.prices[priceType]} €`);
                });
                resolve(names);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = {
    getCardPrice,
    getMkmCardLink,
    getCardGroupName,
};
