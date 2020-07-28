var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { useState, useEffect, useCallback } from 'react';

function useWindowSize() {
  var validWindow = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';

  var getSize = useCallback(function () {
    var size = {
      width: validWindow ? window.innerWidth : undefined,
      height: validWindow ? window.innerHeight : undefined
    };

    return size;
  }, [validWindow]);

  var _useState = useState(getSize()),
      size = _useState[0],
      setSize = _useState[1];

  useEffect(function () {
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

export default useWindowSize;