
const expect = require('expect.js');
const keyGen = require('../lib/keyGen');

describe('KeyGen', function() {
    it ('should return an 8 character key', function() {
        keyGen()
            .then(code => {
                expect(code.length).to.eql(8);
            });
    });
});
