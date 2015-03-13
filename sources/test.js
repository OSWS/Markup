global.M = require('./index.js');
global.T = require('oswst');
global.assert = require('chai').assert;

describe('oswsm@'+require('../package.json').version, function() {
    require('./selector/test.js');
    require('./tag/test.js');
    require('./single/test.js');
    require('./double/test.js');
    require('./singles/test.js');
    require('./doubles/test.js');
});