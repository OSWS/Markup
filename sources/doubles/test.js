describe('doubles', function() {
    it('div', function() {
        assert.equal(String(M.div), '<div></div>');
        assert.equal(String(M.div()), '<div></div>');
        assert.equal(String(M.div(T.data(123))), '<div>123</div>');
    });
});