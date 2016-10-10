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
        containsRequest = referenceLower.indexOf('request') > -1,
        containsSet = referenceLower.indexOf('set') > -1,
        results = containsRequest || containsSet ? true : false;
    return results;
}

function isCancellationFn(func) {
    var reference = func.toString(),
        referenceLower = reference.toLowerCase(),
        containsCancel = referenceLower.indexOf('cancel') > -1,
        containsClear = referenceLower.indexOf('clear') > -1,
        results = containsCancel || containsClear ? true : false;
    return results;
}

function isAnimationFrameFunction(func) {
    if (!func) {
        return;
    }
    var reference = func.toString();
    reference = reference.indexOf('AnimationFrame') > -1;
    return reference;
}



// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}


        var RA = requestFrame('request');
        var CA = requestFrame('cancel');
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
        expect(isAnimationFrameFunction(RA) === isAnimationFrameFunction(CA)).to.be.ok;
    });
});



describe('Request type', function() {
    it('Should return a request or set function', function() {
        expect(isRequestOrSetFn(RA)).to.be.ok;
    });
});



describe('Cancel type', function() {
    it('Should return a cancellation function', function() {
        expect(isCancellationFn(CA)).to.be.ok;
    });
});



describe('Request & cancel in conjunction', function() {
    it('Should provide a matching pair of start and cancellation functions ', function() {
        expect(isAnimationFrameFunction(RA) === isAnimationFrameFunction(CA)).to.be.ok;
    });
});
