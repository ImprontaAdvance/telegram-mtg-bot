
function createReplyMarkup(prices) {
    var inline_keyboard = [];
    Object.keys(prices).forEach(el => inline_keyboard.push([{
        text: el,
        callback_data: el,
    }]));
    return {
        inline_keyboard,
    };
}

module.exports = {
    createReplyMarkup,
};
