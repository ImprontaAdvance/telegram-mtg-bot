const sets = require('../expansion.json');

function setExpansionTag(expansion) {
    return sets[expansion] || expansion;
}

module.exports = {
    setExpansionTag,
};
