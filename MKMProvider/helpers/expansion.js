const sets = require('../data/expansion.json');

function getExpansionCode(expansion) {
    return sets[expansion] || expansion;
}

module.exports = {
    getExpansionCode,
};
