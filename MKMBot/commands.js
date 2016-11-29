const requests = require('./requests.js');

const HISTORY_SIZE = 10;

var lastCommands = [];

const COMMANDS = {
    price: '/price - use this command followed by a card name to retrieve the prices for the first 8 cards matching the name. You can search for multiple cards separating names with commas. The price given is the trend price.',
    last: '/last - retrieve the last 10 card names searched.',
    low: '/low - Same as /price, but retrieve the lowest price for card (condition EX+).',
    credits: '/credits - see who is behind the project.',
    inline: 'You can also use in any chat @mkmpricebot followed by a card name to get the Mkm link page to the card.'
};

function start(message, matches) {
    return new Promise(function(res, rej) {
        var userFirsName = message.from.first_name;
        var resp = 'Welcome to the MTG Telegram Bot, ' + userFirsName + '. With this bot you can easily retrieve <a href="http://magic.wizards.com/en">Magic: The Gathering®</a> card\'s prices from <a href="https://www.magiccardmarket.eu/">MagicCardMarket</a>. Just use the command /price followed by a card name, or /help to explore the list of all available commands.';
        res(resp);
    }).then(start => {
        return {
            resp: start,
            options: {
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }
        };
    });
}

function price(message, matches) {
    var cards = matches[1].split(',');

    cards.forEach(function (el) {
        lastCommands.unshift(el);
        lastCommands.splice(HISTORY_SIZE, 1);
    });

    var promises = cards.map(function(el) {
        return requests.getCardPrice(el, 'TREND');
    });

    return Promise.all(promises)
        .then(responses => {
            return {
                text: responses
                        .map(response => response.prices)
                        .join('\n')
            };
        });
}

function low(message, matches) {
    var cards = matches[1].split(',');

    cards.forEach(function (el) {
        lastCommands.unshift(el);
        lastCommands.splice(HISTORY_SIZE, 1);
    });

    var promises = cards.map(function(el) {
        return requests.getCardPrice(el, 'LOWEX');
    });

    return Promise.all(promises)
        .then(responses => {
            return {
                text: responses
                        .map(response => response.prices)
                        .join('\n')
            };
        });
}

function help(message, matches) {
    return new Promise(function(res, rej) {
        var resp = 'This is the list of available commands: \n';
        resp += Object.keys(COMMANDS).map(el => COMMANDS[el]).join('\n');
        res(resp);
    }).then(help => {
        return {
            resp: help,
        };
    });
}

function last(message, mathces) {
    return new Promise(function(res, rej) {
        var resp = lastCommands.length === 0 ? 'Seems you have no researches yet. Try /price followed by a card name to start a research.' : 'The last 10 card searched:\n' + lastCommands.join('\n');
        res(resp);
    }).then(last => {
        return {
            resp: last,
        };
    });
}

module.exports = {
    price,
    help,
    start,
    last,
    low,
};
