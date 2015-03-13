describe('single', function() {
    it('img', function() {
        assert.equal(String(M.Single('.big', { src: 'img.jpg' }).name('img')), '<img class="big" src="img.jpg"/>');
    });
});