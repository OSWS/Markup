describe('singles', function() {
    it('img', function() {
        assert.equal(String(M.img), '<img/>');
        assert.equal(String(M.img()), '<img/>');
    });
});