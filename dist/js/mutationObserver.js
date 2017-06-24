'use strict';

var mutationObserver = new MutationObserver(function (mutations) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mutations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var mutation = _step.value;

      if (mutation.addedNodes) {
        var addedNodes = $(mutation.addedNodes);
        var imageElements = addedNodes.find('img');
        // let backgroundImages = utils.getBackgroundImages(addedNodes);
        // let addedImages = $.merge(imageElements, backgroundImages);

        imageElements.each(function (i, elem) {
          var imageDom = $(this);
          processImage(imageDom);
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});

var options = {
  subtree: true,
  childList: true
};