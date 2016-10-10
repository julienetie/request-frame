describe('System check', function () {
    it('DeStijl function exists', function () {
        expect(_deStijl).to.be.a('function');
    });
    it('Style namespace to exist as an object', function(){
        var obj = _deStijl.isObject(style);
        expect(obj).to.be.true;
    });
    it('Version should be a string', function(){
        expect(DeStijl.version).to.be.a('string');
    })
});
