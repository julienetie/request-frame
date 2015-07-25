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
