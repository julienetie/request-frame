(function() {
    /**
     * **DISCLAIMER** not yet tested.
     * This timing functioin will return the native or prefixexd requestAnimationFrame or 
     * cancelAnimationFrame function for all modern and legacy browsers that
     * natively support the timing functions. "ms" & "o" are not required.
     * @author Julien Etienne
     * @license MIT
     * @param  {String} type   'request' | 'cancel'
     * @return {Function}      Timing function.
     */
    function requestFrame(type) {

        // Vendor prefixes disassembled
        var vendors = ['moz', 'webkit'],
            aF = 'AnimationFrame',
            vendorCancel,
            rAF, cAF, rqAF = 'Request' + aF,
            lastTime = 0;


        (function setLegacyDate() {
            if (!Date.now) {
                Date.now = function() {
                    return new Date().getTime();
                };
            }
        }());

        /**
         * hasIOS6RequestAnimationFrameBug.
         * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a} - Commentary.
         * @Copyright 2015 - Julien Etienne. 
         * @License: MIT.
         */
        function hasIOS6RequestAnimationFrameBug() {
            var hasMobileDeviceWidth = screen.width <= 768 ? true : false,
                requiresWebkitRequestAnimationFrame = !((window.webkitRequestAnimationFrame && window.requestAnimationFrame)),
                hasNoNavigationTiming = window.performance ? false : true;
            if (requiresWebkitRequestAnimationFrame && hasMobileDeviceWidth && hasNoNavigationTiming) {
                if (window.webkitRequestAnimationFrame || window.requestAnimationFrame) {
                    console.warn('This device may contain the iOS v6x webkitRequestAnimationFrame timing bug. For timing, please use an alternative such as the "setTimeout()" or "setInterval()" API');
                    return true;
                } else {
                    console.info('hasIOS6RequestAnimationFrameBug is not applicable for this device');
                    return false;
                }
            } else {
                return false;
            }
        }

        /**
         * Native clearTimeout function.
         * @return {Function}
         */
        function clearTimeoutWithId() {
            return clearTimeout;
        }

        /**
         * Provides the native setTimeout function for legacy support,
         * and returns the timestamp.
         * This polyfill introduced by Paul Irish & Improved by Darius Bacon.
         * @see  {@link http://www.paulirish.com/2011/
         * requestanimationframe-for-smart-animating}
         * @see  {@link https://github.com/darius/requestAnimationFrame/blob/
         * master/requestAnimationFrame.js}
         * @callback {Number} - Timestamp.
         * @return {Function} - setTimeout Function.
         */
        function setTimeoutWithTimestamp(callback) {
            var now = Date.now(),
                nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() {
                    callback(lastTime = nextTime);
                },
                nextTime - now);
        }

        /**
         * Will assign the native function, prefixed function 
         * or use the setTimeoutWithTimestamp function.
         * @return {Function}
         */
        function setFrameRequestFunction() {
            if (Array.prototype.filter) {
                rAF = window[type + aF] || window[vendors.filter(function(vendor) {
                    if (window[vendor + rqAF] !== undefined)
                        return vendor;
                }) + rqAF] || setTimeoutWithTimestamp;
            } else {
                return setTimeoutWithTimestamp;
            }
            if (!hasIOS6RequestAnimationFrameBug()) {
                return rAF;
            } else {
                return setTimeoutWithTimestamp;
            }
        }

        /**
         * Will assign the native function, prefixed function 
         * or use the clearTimeoutWithId function.
         * @return {Function}
         */
        function setFrameCancellationFunction() {
            var arr = [];
            if (Array.prototype.map) {
                vendorCancel = vendors.map(function(vendor) {
                    return ['Cancel', 'CancelRequest'].map(function(timingFunction) {
                        arr.push(vendor + timingFunction + aF);
                    });
                });
            } else {
                return clearTimeoutWithId;
            }

            function checkCancellationFunction(prefixed, i) {
                var cancellationFunction;
                for (; i < prefixed.length; i++) {
                    if (window[prefixed[i]]) {
                        cancellationFunction = window[prefixed[i]];
                        break;
                    }

                }
                return cancellationFunction;
            }


            cAF = window[type + aF] || checkCancellationFunction(arr, 0) || clearTimeoutWithId;

            if (!hasIOS6RequestAnimationFrameBug()) {
                return cAF;
            } else {
                return clearTimeoutWithId;
            }
        }

        // User's choice
        if (type === 'request' || '') {
            if (window.mozRequestAnimationFrame && !window.mozCancelAnimationFrame) {
                return setTimeoutWithTimestamp;
            } else {
                return setFrameRequestFunction();
            }
        } else if (type === 'cancel') {
            return setFrameCancellationFunction();
        } else {
            throw new Error('RequestFrame parameter is not a type.');

        }

    }


    return requestFrame;
}());
