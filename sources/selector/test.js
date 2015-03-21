var selector = require('../').selector;
var assert = require('chai').assert;

it('selector', function() {
    var string = '.class-name.withBig.letters.AndFromIt#Id1#Id2[attr1=http://link.without/quotes.png,attr2=' + "'http://link.with/single/quotes'" + '][attr3="http://link.with/double/quotes",attr4' + "'attr5'"+' "attr6"][alt=#simple!]';
    var attributes = {};
    selector(attributes, string);
    assert.deepEqual(attributes, {
        class: 'class-name withBig letters AndFromIt',
        id: 'Id2',
        attr1: 'http://link.without/quotes.png',
        attr2: 'http://link.with/single/quotes',
        attr3: "http://link.with/double/quotes",
        attr4: null,
        "'attr5'": null,
        '"attr6"': null,
        alt: "#simple"
    });
});