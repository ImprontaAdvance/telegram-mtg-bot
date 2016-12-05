const requests = require('./requests.js');
const helper = require('./helpers/inlineButtons.js');

const HISTORY_SIZE = 10;

var lastCommands = [];

const COMMANDS = {
    price: '/price - use this command followed by a card name to retrieve the prices for the cards matching the name. You can search for multiple cards separating names with commas. The prices shown are the lowest price for card (condition EX+) and the trend price.',
    last: '/last - retrieve the last 10 card names searched.',
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

function price(message, card) {

    lastCommands.unshift(card);
    lastCommands.splice(HISTORY_SIZE, 1);

    return requests.getCardPrice(card)
    .then(response => {
        return {
            text: response.prices
            .join(''),
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
        var resp = lastCommands[message.from.id] === undefined ? 'Seems you have no researches yet. Try /price followed by a card name to start a research.' : `The last 10 card searched:\n${lastCommands[message.from.id].join('\n')}`;
        res(resp);
    }).then(last => {
        return {
            resp: last,
        };
    });
}

function createCardButtons(message, matches) {
    var cards = matches[1].split(',');

    var promises = cards.map(function(el) {
        return requests.getCardGroupName(el, 'TREND');
    });

    return Promise.all(promises)
        .then(responses => {
            return responses.map((el) => {
                return {
                    text: 'Choose the card',
                    options: {
                        reply_markup: helper.createReplyMarkup(el),
                    },
                };
            });
        });
}

module.exports = {
    price,
    help,
    start,
    last,
    createCardButtons,
};
