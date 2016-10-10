
// Node.js/ CommonJS
if (typeof module === 'object' && typeof module.exports === 'object') {
module.exports = exports = requestFrame;
}

// AMD
else if (typeof define === 'function' && define.amd) {
define(function() {
  return requestFrame;
});
}

// Default to window as global
else if (typeof window === 'object') {
window.requestFrame = requestFrame;
}
/* global -module, -exports, -define */

}((typeof window === "undefined" ? {} : window)));
