import { useRef, useEffect } from 'react';

function useInterval(callback, delay) {
  var savedCallback = useRef(null);

  useEffect(function () {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(function () {
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

export default useInterval;