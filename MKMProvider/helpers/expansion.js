const magicSets = require('../data/AllSets.json');

function formatExpansions(sets) {
    var expansions = {};
    Object.keys(sets).forEach(el => {
        expansions[sets[el].name] = el;
    });
    return expansions;
}

function setExpansionTag(expansion) {
    var sets = formatExpansions(magicSets);
    return sets[expansion] || expansion;
}

module.exports = {
    setExpansionTag,
};
