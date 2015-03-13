it('selector', function() {
    var selector = '.class-name.withBig.letters.AndFromIt#Id1#Id2[attr1=http://link.without/quotes.png,attr2=' + "'http://link.with/single/quotes'" + '][attr3="http://link.with/double/quotes",attr4' + "'attr5'"+' "attr6"][alt=#simple!]';
    var attributes = {};
    M.selector(attributes, selector);
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