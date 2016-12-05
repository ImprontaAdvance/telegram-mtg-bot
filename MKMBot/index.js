const TelegramBot = require('node-telegram-bot-api');
const commands = require('./commands.js');
const requests = require('./requests.js');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

var bot = new TelegramBot(TOKEN, {polling: true });

bot.onText(/^\/price (.+)$/, function(msg, match) {
    commands.manageCards(msg, match)
        .then(res => {
            res.forEach(el => {
                bot.sendMessage(msg.chat.id, el.text, el.options);
            });
        })
        .catch(e => {
            console.error(e);

            if(e.message)
                bot.sendMessage(msg.chat.id, e.message);
        });
});


bot.onText(/^\/start$/, function(msg, match) {
    var start = commands.start(msg, match).then(start => {
        bot.sendMessage(msg.chat.id, start.resp, start.options);
    });
});

bot.onText(/^\/help$/, function(msg, match) {
    var help = commands.help(msg, match).then(help => {
        bot.sendMessage(msg.chat.id, help.resp, help.options);
    });
});

bot.onText(/^\/last$/, function(msg, match) {
    var last = commands.last(msg, match).then(last => {
        bot.sendMessage(msg.chat.id, last.resp, last.options);
    });
});

bot.onText(/^\/credits$/, function(msg, match) {
    bot.sendMessage(msg.chat.id, 'Fun project from <a href="http://improntaadv.com/">Impronta Advance</a> team.\nCheck on GitHub: https://github.com/ImprontaAdvance/telegram-mtg-bot/', {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
    });
});

bot.onText(/^\/price$/, function(msg, match) {
    bot.sendMessage(msg.chat.id, 'Please provide one or more card names. I can\'t read your mind. Yet.');
});

bot.onText(/.+\/(start|help|credits|price|last)/, function(msg, match) {
    bot.sendMessage(msg.chat.id, 'Don\'t type text before a command, please.');
});

bot.onText(/^\/(?!credits|help|start|price|last).*$/, function(msg, match) {
    bot.sendMessage(msg.chat.id, 'I don\'t know this command. If you\'re lost, try /help.');
});


//inline queries
bot.on('inline_query', function(query) {
    requests.getMkmCardLink(query.query)
    .then((res) => {
        bot.answerInlineQuery(query.id, res.map(el => {
            return {
                type: 'article',
                id: Math.random().toString(),
                title: `${el.name}-${el.expansion}`,
                input_message_content: {
                    message_text: `<a href="${el.link}">${el.name}</a>`,
                    parse_mode: 'HTML',
                },
                url: el.link,
            };
        }));
    });
});


// button callback query
bot.on('callback_query', function(query) {
    bot.answerCallbackQuery(query.id)
    .then(() => {
        commands.manageSelectedCard(query.message, query.data)
        .then((res) => {
            bot.sendMessage(query.message.chat.id, res.text);
        })
        .catch(e => console.log(e));

    });
});
