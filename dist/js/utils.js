'use strict';

var utils = {
  errorHandler: function errorHandler(error) {
    console.log(error);
  },

  getRandomString: function getRandomString() {
    return (Math.PI * Math.random()).toString(36).substring(2);
  },

  getBackgroundImages: function getBackgroundImages() {
    return $('*:not(img,a,p,span)').filter(function () {
      if (this.currentStyle) return this.currentStyle['backgroundImage'] !== 'none';else if (window.getComputedStyle) return document.defaultView.getComputedStyle(this, null).getPropertyValue('background-image') !== 'none';
    });
    // console.log(bg.css('background-image').slice(5, -2))
  }
};