var img = require('../').img;
var assert = require('chai').assert;

describe('singles', function() {
    it('img', function() {
        assert.equal(String(img), '<img/>');
        assert.equal(String(img()), '<img/>');
    });
});