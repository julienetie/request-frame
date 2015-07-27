var expect = chai.expect,

    err = new ReferenceError('RequestFrame parameter is not a type.'),
    native = 'native',
    request = 'request',
    cancel = 'cancel',
    rAF = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame,

    cAF = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame;

function isRequestOrSetFn(func) {
    var reference = func.toString(),
        referenceLower = reference.toLowerCase(),
        containsRequest = reference.indexOf('request') > -1,
        containsSet = reference.indexOf('set') > -1,
        results = containsRequest || containsSet ? true : false;
    return results;
}

function isCancellationFn(func) {
    var reference = func.toString(),
        referenceLower = reference.toLowerCase(),
        containsCancel = reference.indexOf('cancel') > -1,
        containsClear = reference.indexOf('clear') > -1,
        results = containsCancel || containsClear? true : false;
    return results;
}

function isAnimationFrameFunction(func) {
    var reference = func.toString();
    reference = reference.indexOf('AnimationFrame') > -1;
    return reference;
}
/**
 * Need to add iOS 6 + ff 4-10 bug checks.
 */


describe('requestFrame', function() {
    it('Should throw an error if type is not valid', function() {
        expect(function() {
                requestFrame('<invalid-type></invalid-type>');
            }).to
            .throw('RequestFrame parameter is not a type.');
    });
});



describe('Native type', function() {
    before(function() {
        requestFrame(native);
        var hasNativeRequestFunction = window.requestAnimationFrame === rAF,
            hasNativeCancellationFunction = window.requestAnimationFrame === cAF;
    });

    it('Should return nothing', function() {
        expect(requestFrame(native)).to.not.be.ok;
    });

    it('Should set requestAnimationFrame as request or set function', function() {
        expect(isRequestOrSetFn(window.requestAnimationFrame)).to.be.ok;
    });

    it('Should set cancelAnimationFrame as request or set function', function() {
        expect(isCancellationFn(window.cancelAnimationFrame)).to.be.ok;
    });

    it('Should provide a matching pair of start and cancellation functions ', function() {
        expect(isAnimationFrameFunction(rAF) === isAnimationFrameFunction(cAF)).to.be.ok;
    });
});



describe('Request type', function() {
    it('Should return a request or set function', function() {
        expect(isRequestOrSetFn(requestFrame(request))).to.be.ok;
    });
});



describe('Cancel type', function() {
    it('Should return a cancellation function', function() {
        expect(isCancellationFn(requestFrame(cancel))).to.be.ok;
    });
});



describe('Request & cancel in conjunction', function() {
    before(function() {
        var hasNativeRequestFunction = requestFrame(request) === rAF,
            hasNativeCancellationFunction = requestFrame(cancel) === cAF;
    });

    it('Should provide a matching pair of start and cancellation functions ', function() {
        expect(isAnimationFrameFunction(rAF) === isAnimationFrameFunction(cAF)).to.be.ok;
    });
});
