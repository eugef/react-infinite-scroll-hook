'use strict';

exports.__esModule = true;

var _react = require('react');

var _useWindowSize2 = require('./useWindowSize');

var _useWindowSize3 = _interopRequireDefault(_useWindowSize2);

var _useInterval = require('./useInterval');

var _useInterval2 = _interopRequireDefault(_useInterval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WINDOW = 'window';
var PARENT = 'parent';

function getElementSizes(element) {
  var parentRect = element.getBoundingClientRect();
  var top = parentRect.top,
      bottom = parentRect.bottom,
      left = parentRect.left,
      right = parentRect.right;


  return { top: top, bottom: bottom, left: left, right: right };
}

function isElementInView(element, windowHeight, windowWidth) {
  if (element) {
    var _getElementSizes = getElementSizes(element),
        left = _getElementSizes.left,
        right = _getElementSizes.right,
        top = _getElementSizes.top,
        bottom = _getElementSizes.bottom;

    if (left > windowWidth) {
      return false;
    } else if (right < 0) {
      return false;
    } else if (top > windowHeight) {
      return false;
    } else if (bottom < 0) {
      return false;
    }
  }

  return true;
}

function useInfiniteScroll(_ref) {
  var loading = _ref.loading,
      hasNextPage = _ref.hasNextPage,
      onLoadMore = _ref.onLoadMore,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 150 : _ref$threshold,
      _ref$checkInterval = _ref.checkInterval,
      checkInterval = _ref$checkInterval === undefined ? 200 : _ref$checkInterval,
      _ref$scrollContainer = _ref.scrollContainer,
      scrollContainer = _ref$scrollContainer === undefined ? WINDOW : _ref$scrollContainer;

  var ref = (0, _react.useRef)(null);

  var _useWindowSize = (0, _useWindowSize3.default)(),
      windowHeight = _useWindowSize.height,
      windowWidth = _useWindowSize.width;
  // Normally we could use the "loading" prop, but when you set "checkInterval" to a very small
  // number (like 10 etc.), some request components can't set its loading state
  // immediately (I had this problem with react-apollo's Query component. In some cases, it runs
  // "updateQuery" twice). Thus we set our own "listen" state which immeadiately turns to "false" on
  // calling "onLoadMore".


  var _useState = (0, _react.useState)(true),
      listen = _useState[0],
      setListen = _useState[1];

  (0, _react.useEffect)(function () {
    if (!loading) {
      setListen(true);
    }
  }, [loading]);

  function getBottomOffset() {
    var rect = ref.current.getBoundingClientRect();

    var bottom = rect.bottom;
    var bottomOffset = bottom - windowHeight;

    if (scrollContainer === PARENT) {
      var _getElementSizes2 = getElementSizes(ref.current.parentNode),
          parentBottom = _getElementSizes2.bottom;
      // Distance between bottom of list and its parent


      bottomOffset = bottom - parentBottom;
    }

    return bottomOffset;
  }

  function isParentInView() {
    var parent = ref.current ? ref.current.parentNode : null;

    return isElementInView(parent, windowHeight, windowWidth);
  }

  function isListInView() {
    var element = ref.current;

    return isElementInView(element, windowHeight, windowWidth);
  }

  function listenBottomOffset() {
    if (listen && !loading && hasNextPage) {
      if (ref.current) {
        if (scrollContainer === PARENT) {
          if (!isParentInView()) {
            // Do nothing if the parent is out of screen
            return;
          }
        } else {
          if (!isListInView()) {
            return;
          }
        }

        // Check if the distance between bottom of the container and bottom of the window or parent
        // is less than "threshold"
        var bottomOffset = getBottomOffset();
        var validOffset = bottomOffset < threshold;

        if (validOffset) {
          setListen(false);
          onLoadMore();
        }
      }
    }
  }

  (0, _useInterval2.default)(function () {
    listenBottomOffset();
  },
  // Stop interval when there is no next page.
  hasNextPage ? checkInterval : 0);

  return ref;
}

exports.default = useInfiniteScroll;
module.exports = exports['default'];