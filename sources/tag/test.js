var Tag = require('../').Tag;
var assert = require('chai').assert;

describe('tag', function() {
    it('.attr', function() {
        var tag = Tag().attr({ a: 123, b: 456 }).attr({ a: 789 });
        assert.deepEqual(tag._attr, { a: 789, b: 456 });
    });
    it('.selector', function() {
        var tag = Tag().selector('.ab.cd').selector('.ef');
        assert.deepEqual(tag._attr, { class: 'ab cd ef' });
    });
    it('.__attr', function() {
        assert.deepEqual(Tag().attr({ class: 'big', src: 'img.jpg' }).__attr(), [' class', '="', 'big', '"', ' src', '="', 'img.jpg', '"']);
    });
});