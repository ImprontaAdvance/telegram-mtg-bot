const request = require('request');
const parser = require('xml2json');
const helpers = require('./helpers/headerGenerator.js');
const expansion = require('./helpers/expansion.js');

function getCardFromMkm(cardName) {
    var url = `https://www.mkmapi.eu/ws/v1.1/products/${encodeURIComponent(cardName)}/1/1/false`;
    return new Promise(function(resolve, rej) {
        request({
            url,
            headers: {
                Authorization: helpers.generateAuthHeader('GET', url),
            }
        }, function(err, res, body) {
            if(err)
                return rej(err);

            if(res.statusCode >= 400)
                return rej();

            var cards = parser.toJson(body, {object: true}).response.product;
            resolve(cards);
        });
    })
    .then(res => {
        if(!Array.isArray(res))
            res = [res];
        return res.filter(card => card.rarity !== 'Special' && card.category.categoryName === 'Magic Single')
        .map((card, i, res) => {
            return {
                names: res[i].name.map(el => el.productName),
                expansion: expansion.getExpansionCode(card.expansion),
                expansionMkm: card.expansion,
                number: card.number,
                rarity: card.rarity,
                prices: {
                    SELL: card.priceGuide.SELL,
                    LOW: card.priceGuide.LOW,
                    LOWEX: card.priceGuide.LOWEX,
                    LOWFOIL: card.priceGuide.LOWFOIL,
                    AVG: card.priceGuide.AVG,
                    TREND: card.priceGuide.TREND,
                },
            };
        });
    });
};


module.exports = {
    getCardFromMkm,
};
