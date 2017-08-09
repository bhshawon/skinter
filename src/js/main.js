'use strict';

console.log('Content script running');

let imageElements = $('img');
let backgroundImages = utils.getBackgroundImages($('*:not(img,a,p,span)'));
let documentImages = $.merge(imageElements, backgroundImages);
documentImages.hide();

$(function () {
  documentImages.each(function (i, elem) {
    let imageDom = $(this);
    processImage(imageDom);
  });
})

mutationObserver.observe(document, options);



