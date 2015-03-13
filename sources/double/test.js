describe('double', function() {
    it('div', function() {
        assert.equal(
            String(
                M.Double('.container', { 'data-id': '123' }, T.data(456)).name('div')
            ),
            '<div class="container" data-id="123">456</div>'
        );
    });
});