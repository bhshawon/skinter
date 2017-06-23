'use strict';

var elementProvider = {
  getElementType: function getElementType(elementDom) {
    if (htmlElement.nodeName === 'IMG') {
      return imgElement;
    } else {
      return backgroundImageElement;
    }
  }
};