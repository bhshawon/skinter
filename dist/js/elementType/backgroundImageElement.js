'use strict';

var backgroundImageElement = {
  hideImage: function hideImage(backgroundImageDom) {
    backgroundImageDom.css('background-image', '');
  },
  getImageSource: function getImageSource(backgroundImageDom) {
    // The value is of format url(imageUrl)
    var backgroundImageValue = backgroundImageDom.css('background-image');
    // Get the url from inside brackets
    var imageUrl = backgroundImageDom.css('background-image').slice(5, -2);
    return imageUrl;
  },
  revealTransformedImage: function revealTransformedImage(backgroundImageDom, transformedImageSource) {
    backgroundImageDom.css('background-image', 'url(' + transformedImageSource + ')');
  }
};