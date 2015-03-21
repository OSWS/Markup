var Single = require('../').Single;
var assert = require('chai').assert;

describe('single', function() {
    it('img', function() {
        assert.equal(String(Single('.big', { src: 'img.jpg' }).name('img')), '<img class="big" src="img.jpg"/>');
    });
});