const expect = require('chai').expect;
const sinon = require('sinon');
const commands = require('../commands.js');
const requests = require('../requests.js');

const AVAILABLE_COMMANDS = ['/price', '/credits', '/last', '/low'];

const USER = {
    id: '12',
    first_name: 'Mendicant Bias'
};

const MESSAGE = {
    message_id: Math.random(),
    from: USER,
    date: new Date(),
};

const MATCHES = [null, 'SnapCasterMage'];
const MATCHES2 = [null, 'Bolt'];
const CARD_PRICES = { prices: ['300 €']};


describe(' MTG Telegram Bot Commands', function() {
    describe('start command', function() {
        it('should return an object containing a welcome string with user name', function() {
            return commands.start(MESSAGE, MATCHES).then(start => {
                expect(start).to.be.an('object');
                expect(start.resp).to.include('Welcome');
                expect(start.resp).to.include(USER.first_name);
            });
        });

        it('the returning object should also contain options to parse html', function() {
            return commands.start(MESSAGE, MATCHES).then(start => {
                expect(start).to.include.keys('options');
                expect(start.options.parse_mode).to.equal('HTML');
            });
        });
    });

    describe('price command', function() {
        var mock = sinon.mock(requests);
        mock.expects('getCardPrice').returns(CARD_PRICES).withArgs(MATCHES[1]);

        it('should return an object containing a response string', function() {
            return commands.price(MESSAGE, MATCHES).then(price => {
                expect(price).to.be.an('object');
                expect(price.text).to.equal(CARD_PRICES.prices[0]);
                mock.verify();
                mock.restore();
            });
        });
    });

    describe('help command', function() {
        it('should return an object with a response string containing all available commands', function() {
            return commands.help(MESSAGE, MATCHES).then(help => {
                expect(help).to.be.an('object');
                AVAILABLE_COMMANDS.forEach(function(el) {
                    expect(help.resp).to.include(el);
                });
            });
        });
    });

    describe('last command', function() {
        it('should return an object containgin response string', function() {
            return commands.last(MESSAGE, MATCHES).then(last => {
                expect(last).to.be.an('object');
                expect(last.resp).to.be.a('string');
                expect(last.resp).to.contain(MATCHES[1]);
            });
        });
    });
});
