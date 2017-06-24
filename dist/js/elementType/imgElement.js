'use strict';

var imgElement = {
  hideImage: function hideImage(imageDom) {
    imageDom.removeAttr('srcset');
    imageDom.hide();
  },
  getImageSource: function getImageSource(imageDom) {
    return imageDom.prop('src');
  },
  revealTransformedImage: function revealTransformedImage(imageDom, transformedImageSource) {
    imageDom.attr('src', transformedImageSource);
    imageDom.show();
  }
};