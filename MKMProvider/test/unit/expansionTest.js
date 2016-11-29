const expect = require('chai').expect;
const expansion = require('../../helpers/expansion.js');

const TAGS = {
    'Limited Edition Alpha': 'LEA',
    'Kaladesh': 'KLD',
};

describe('setExpansionTag function', function() {
    it('given an expansion string should return the expansion tag string', function(done) {
        var res = expansion.setExpansionTag('Kaladesh');
        expect(res).to.equal(TAGS.Kaladesh);
        done();
    });

    it('should return the expansion name if the string doesn\'t match an expansion tag', function(done) {
        var res = expansion.setExpansionTag('Alpha');
        expect(res).to.equal('Alpha');
        var a = expansion.setExpansionTag('Limited Edition Alpha');
        expect(a).to.equal('LEA');
        done();
    });
});
