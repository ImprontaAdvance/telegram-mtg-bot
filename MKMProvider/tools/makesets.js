const magicSets = require('../data/AllSets.json');
const fs = require('fs');

var expansions = {};
Object.keys(magicSets).forEach(el => {
    expansions[magicSets[el].name] = el;
});

fs.writeFileSync('expansion.json', JSON.stringify(expansions));
