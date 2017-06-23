'use strict';

var imgElement = {
  hideImage: function hideImage(imageDom) {
    imageDom.removeAttr('src');
  },
  getImageSource: function getImageSource(imageDom) {
    return imageDom.prop('src');
  },
  setSource: function setSource(imageDom, source) {
    imageDom.attr('src', source);
    imageDom.show();
  }
};