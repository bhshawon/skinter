'use strict';

var elementProvider = {
  getElement: function getElement(elementDom) {
    if (elementDom.prop("nodeName") === 'IMG') {
      return imgElement;
    } else {
      return backgroundImageElement;
    }
  }
};