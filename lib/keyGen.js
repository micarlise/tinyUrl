const crypto = require('crypto');
const util = require('util');

const randomBytes = util.promisify(crypto.randomBytes);

function keyGen() {
    return randomBytes(4)
        .then(b => b.toString('hex'));
}

module.exports = keyGen;
