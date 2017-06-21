'use strict';

console.log('Content script running');

$(document).ready(function () {
  var documentImages = $('img');
  documentImages.hide();
  documentImages.removeAttr('srcset');
  $(function () {
    documentImages.each(processImage);
  });

  mutationObserver.observe(document, options);
});