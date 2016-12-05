
function createReplyMarkup(names) {
    var inline_keyboard = [];
    names.forEach(el => inline_keyboard.push([{
        text: el,
        callback_data: el,
    }]));
    return {
        inline_keyboard,
    };
}

function getCardNames(cards) {
    var names = [];
    cards.forEach(function(el) {
        var singleName = el.names[0].replace(/\s\(Version\s\d+\)/, '');

        if(names.indexOf(singleName) === -1)
            names.push(singleName);
    });
    return names;
}


module.exports = {
    createReplyMarkup,
    getCardNames,
};
