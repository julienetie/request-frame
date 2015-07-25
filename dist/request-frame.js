(function (window) {

/**
 * @Copyright Julien Etienne 2015 All Rights Reserved.
 * @license MIT
 * requestFrame is a polyfill that provides and the most appropriate timing 
 * function according to the browser implementation.
 */

/**
 * Provides the requested timing function or re/assigns requestAnimationFrame & 
 * cancelAnimationFrame with the native function or polyfill.
 * @param  {String} type request | cancel | native
 * @return {Function} - Timing function.
 */
function requestFrame(type) {

    // The only vendor prefixes required
    var vendors = ['moz', 'webkit'],

        // Disassembled timing function abbreviations.
        aF = 'AnimationFrame',
        rqAF = 'Request' + aF,

        // Final assigned functions
        assignedRequestAnimationFrame,
        assignedCancelAnimationFrame,

        // Initial time of the timing lapse.
        previousTime = 0;

    // Date.now polyfill, mainly for legacy IE versions.
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }

    /**
     * hasIOS6RequestAnimationFrameBug.
     * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a} 
     * - Commentary.
     * @Copyright 2015 - Julien Etienne. 
     * @License: MIT.
     */
    function hasIOS6RequestAnimationFrameBug() {
        var hasMobileDeviceWidth = screen.width <= 768 ? true : false,
            requiresWebkitRequestAnimationFrame = !(
                window.webkitRequestAnimationFrame &&
                window.requestAnimationFrame),
            hasNoNavigationTiming = window.performance ? false : true;
        if (requiresWebkitRequestAnimationFrame &&
            hasMobileDeviceWidth &&
            hasNoNavigationTiming) {
            if (window.webkitRequestAnimationFrame ||
                window.requestAnimationFrame) {
                console.warn('This device may contain the iOS v6x ' +
                    'webkitRequestAnimationFrame timing bug. For timing, ' +
                    'please use an alternative such as the "setTimeout()" or' +
                    '"setInterval()" API');
                return true;
            } else {
                console.info('hasIOS6RequestAnimationFrameBug is not ' +
                    'applicable for this device');
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
     * This is a polyfill by Erik, introduced by Paul Irish & 
     * Improved by Darius Bacon.
     * @see  {@link http://www.paulirish.com/2011/
     * requestanimationframe-for-smart-animating}
     * @see  {@link https://github.com/darius/requestAnimationFrame/blob/
     * master/requestAnimationFrame.js}
     * @callback {Number} - Timestamp.
     * @return {Function} - setTimeout Function.
     */
    function setTimeoutWithTimestamp(callback) {
        var immediateTime = Date.now(),
            lapsedTime = Math.max(previousTime + 16, immediateTime);
        return setTimeout(function() {
                callback(previousTime = lapsedTime);
            },
            lapsedTime - immediateTime);
    }

    /**
     * Will assign the native function, prefixed function 
     * or use the setTimeoutWithTimestamp function.
     * @return {Function}
     */
    function queryRequestAnimationFrame() {
        if (Array.prototype.filter) {
            assignedRequestAnimationFrame = window['request' + aF] ||
                window[vendors.filter(function(vendor) {
                    if (window[vendor + rqAF] !== undefined)
                        return vendor;
                }) + rqAF] || setTimeoutWithTimestamp;
        } else {
            return setTimeoutWithTimestamp;
        }
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedRequestAnimationFrame;
        } else {
            return setTimeoutWithTimestamp;
        }
    }

    /**
     * Will assign the native function, prefixed function 
     * or use the clearTimeoutWithId function.
     * @return {Function}
     */
    function queryCancelAnimationFrame() {
        var cancellationNames = [];
        if (Array.prototype.map) {
            vendors.map(function(vendor) {
                return ['Cancel', 'CancelRequest'].map(
                    function(cancellationNamePrefix) {
                        cancellationNames.push(vendor +
                            cancellationNamePrefix + aF);
                    });
            });
        } else {
            return clearTimeoutWithId;
        }

        /**
         * Checks for the prefixed cancelAnimationFrame implementation.
         * @param  {Array} prefixedNames - An array of the prefixed names. 
         * @param  {Number} i          - Iteration start point.
         * @return {Function}          - prefixed cancelAnimationFrame function.
         */
        function prefixedCancelAnimationFrame(prefixedNames, i) {
            var cancellationFunction;
            for (; i < prefixedNames.length; i++) {
                if (window[prefixedNames[i]]) {
                    cancellationFunction = window[prefixedNames[i]];
                    break;
                }
            }
            return cancellationFunction;
        }

        // Use truthly function
        assignedCancelAnimationFrame = window['cancel' + aF] ||
            prefixedCancelAnimationFrame(cancellationNames, 0) ||
            clearTimeoutWithId;

        // Check for iOS 6 bug
        if (!hasIOS6RequestAnimationFrameBug()) {
            return assignedCancelAnimationFrame;
        } else {
            return clearTimeoutWithId;
        }
    }

    // User's choice

    /**
     * The type value "request" singles out firefox 4 - 10 and 
     * assigns the setTimeout function.
     */
    if (type === 'request' || '') {
        if (window.mozRequestAnimationFrame &&
            !window.mozCancelAnimationFrame) {
            return setTimeoutWithTimestamp;
        } else {
            return queryRequestAnimationFrame();
        }
        /**
         * Firefox 4 - 10 defaults to clear animation, which is used for 
         * re-assignment.
         */
    } else if (type === 'cancel') {
        return queryCancelAnimationFrame();
        /**
         * The type value "native" reassigns the expected native properties.
         * Using the previous firefox 4 - 10 patch.
         */
    } else if (type === 'native') {
        if (window.mozRequestAnimationFrame &&
            !window.mozCancelAnimationFrame) {
            window.requestAnimationFrame = setTimeoutWithTimestamp;
            window.cancelAnimationFrame = clearTimeoutWithId;
        } else {
            window.requestAnimationFrame = queryRequestAnimationFrame();
            window.cancelAnimationFrame = queryCancelAnimationFrame();
        }
    } else {
        throw new Error('RequestFrame parameter is not a type.');
    }
}

 /* global module, exports: true, define */
  // Node.js or CommonJS
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = exports = requestFrame;
  }
  // AMD support
  else if (typeof define === 'function' && define.amd) {
    define(function () {
      return requestFrame;
    });
  }
  // Otherwise, attach to window as global
  else if (typeof window === 'object') {
    window.requestFrame = requestFrame;
  }
  /* global -module, -exports, -define */

}(window));
