'use strict';

var utils = {
  errorHandler: function errorHandler(error) {
    console.log(error);
  },

  getRandomString: function getRandomString() {
    return (Math.PI * Math.random()).toString(36).substring(2);
  },

  getBackgroundImages: function getBackgroundImages(selectorElementList) {
    return selectorElementList.filter(function () {
      if (this.currentStyle) return this.currentStyle['backgroundImage'] !== 'none';else if (window.getComputedStyle) return document.defaultView.getComputedStyle(this, null).getPropertyValue('background-image') !== 'none';
    });
  },

  splitRectIntoSquares: function splitRectIntoSquares(width, height, horizontalCount) {
    var aspectRatio = width / height;
    var verticalCount = Math.round(horizontalCount / aspectRatio);
    var horizontalPixelPerSquare = Math.round(width / horizontalCount);
    var verticalPixelPerSquare = Math.round(height / verticalCount);

    var squareArray = [];
    for (var i = 0; (i + 1) * horizontalPixelPerSquare < width; i++) {
      for (var j = 0; (j + 1) * verticalPixelPerSquare < height; j++) {
        squareArray.push({
          startWidth: i * horizontalPixelPerSquare,
          startHeight: j * verticalPixelPerSquare,
          endWidth: (i + 1) * horizontalPixelPerSquare,
          endHeight: (j + 1) * verticalPixelPerSquare
        });
      }
    }

    var boundaryWidth = squareArray[squareArray.length - 1].endWidth;
    var boundaryHeight = squareArray[squareArray.length - 1].endHeight;

    if (boundaryWidth < width) {
      for (var _j = 0; (_j + 1) * verticalPixelPerSquare < height; _j++) {
        squareArray.push({
          startWidth: boundaryWidth,
          startHeight: _j * verticalPixelPerSquare,
          endWidth: width,
          endHeight: (_j + 1) * verticalPixelPerSquare
        });
      }
    }

    var lastSquareStartHeight = squareArray[squareArray.length - 1].endHeight;

    if (boundaryHeight < height) {
      for (var _i = 0; (_i + 1) * horizontalPixelPerSquare < width; _i++) {
        squareArray.push({
          startWidth: _i * horizontalPixelPerSquare,
          startHeight: boundaryHeight,
          endWidth: (_i + 1) * horizontalPixelPerSquare,
          endHeight: height
        });
      }
    }

    var lastSquareStartWidth = squareArray[squareArray.length - 1].endWidth;

    squareArray.push({
      startWidth: lastSquareStartWidth,
      startHeight: lastSquareStartHeight,
      endWidth: width,
      endHeight: height
    });

    return squareArray;
  }
};