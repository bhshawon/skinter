'use strict';

console.log('Content script running');

$(document).ready(function () {
  var imageElements = $('img');
  var backgroundImages = utils.getBackgroundImages($('*:not(img,a,p,span)'));
  var documentImages = $.merge(imageElements, backgroundImages);

  $(function () {
    documentImages.each(function (i, elem) {
      var imageDom = $(this);
      processImage(imageDom);
    });
  });

  mutationObserver.observe(document, options);
});