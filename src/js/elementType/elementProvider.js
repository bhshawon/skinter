'use strict';

const elementProvider = {
  getElement: function getElement(elementDom) {
    if (elementDom.nodeName === 'IMG') {
      return imgElement;
    } else {
      return null;
      // return backgroundImageElement;
    }
  }
}
