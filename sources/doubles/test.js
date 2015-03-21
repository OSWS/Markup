var div = require('../').div;
var data = require('../').data;
var assert = require('chai').assert;

describe('doubles', function() {
    it('div', function() {
        assert.equal(String(div), '<div></div>');
        assert.equal(String(div()), '<div></div>');
        assert.equal(String(div(data(123))), '<div>123</div>');
    });
});