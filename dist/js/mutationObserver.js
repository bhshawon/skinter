'use strict';

var mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes) {
      var addedNodes = $(mutation.addedNodes);
      var images = addedNodes.find('img');
      images.each(processImage);
    }
  });
});

var options = {
  subtree: true,
  childList: true
};