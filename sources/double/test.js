var Double = require('../').Double;
var data = require('../').data;
var assert = require('chai').assert;

describe('double', function() {
    it('div', function() {
        assert.equal(
            String(
                Double('.container', { 'data-id': '123' }, data(456)).name('div')
            ),
            '<div class="container" data-id="123">456</div>'
        );
    });
});