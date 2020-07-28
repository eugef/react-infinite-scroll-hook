'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

function useWindowSize() {
  var validWindow = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';

  var getSize = (0, _react.useCallback)(function () {
    var size = {
      width: validWindow ? window.innerWidth : undefined,
      height: validWindow ? window.innerHeight : undefined
    };

    return size;
  }, [validWindow]);

  var _useState = (0, _react.useState)(getSize()),
      size = _useState[0],
      setSize = _useState[1];

  (0, _react.useEffect)(function () {
    function handleResize() {
      setSize(getSize());
    }

    if (validWindow) {
      window.addEventListener('resize', handleResize);

      return function () {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [getSize, validWindow]);

  return size;
}

exports.default = useWindowSize;
module.exports = exports['default'];