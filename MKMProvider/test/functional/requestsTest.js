const expect = require('chai').expect;
const requests = require('../../requests.js');

const VALID_NAME = 'Snapcaster Mage';
const INVALID_NAME = 'pippopoppolline';


describe('getCardFromMkm function', function () {
    this.timeout(15000);
    it('should retrieve an array of cards objects from mkm if name is correct', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res).to.be.an('array');
            expect(res[0]).to.be.an('object');
        });
    });

    it('the card object should have a names property that is an array of names in different languages', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res[0].names).to.be.an('array');
            expect(res[0].names).to.include(VALID_NAME);
        });
    });

    it('the card object should have an expansion property that is a string', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res[0].expansion).to.be.a('string');
        });
    });

    it('the card object should have a number property tha is a string', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res[0].number).to.be.a('string');
        });
    });

    it('the card object should have a rarity property that is a string', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res[0].rarity).to.be.a('string');
        });
    });

    it('the card object should have a prices property that is an object', function() {
        return requests.getCardFromMkm(VALID_NAME).then(res => {
            expect(res[0].prices).to.be.an('object');
        });
    });

    it('should return an error if name is invalid', function() {
        return requests.getCardFromMkm(INVALID_NAME).catch(err => {
            expect(err).to.be.an('error');
        });
    });

});
