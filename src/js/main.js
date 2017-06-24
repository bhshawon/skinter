'use strict';

console.log('Content script running');

$(document).ready(function () {
  let imageElements = $('img');
  let backgroundImages = utils.getBackgroundImages($('*:not(img,a,p,span)'));
  let documentImages = $.merge(imageElements, backgroundImages);

  $(function () {
    documentImages.each(function (i, elem) {
      let imageDom = $(this);
      processImage(imageDom);
    });
  })

  mutationObserver.observe(document, options);
})



