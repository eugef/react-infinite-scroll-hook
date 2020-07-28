'use strict';

exports.__esModule = true;

var _react = require('react');

function useInterval(callback, delay) {
  var savedCallback = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    savedCallback.current = callback;
  }, [callback]);

  (0, _react.useEffect)(function () {
    function tick() {
      savedCallback.current();
    }

    if (delay) {
      var id = setInterval(function () {
        tick();
      }, delay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
}

exports.default = useInterval;
module.exports = exports['default'];