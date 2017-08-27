'use strict';

const utils = {
  errorHandler: function errorHandler(error) {
    console.log(error);
  },

  getRandomString: function getRandomString() {
    return (Math.PI * Math.random()).toString(36).substring(2);
  },

  getBackgroundImages: function getBackgroundImages(selectorElementList) {
    return selectorElementList.filter(function () {
      if (this.currentStyle)
        return this.currentStyle['backgroundImage'] !== 'none';
      else if (window.getComputedStyle)
        return document.defaultView.getComputedStyle(this, null)
          .getPropertyValue('background-image') !== 'none';
    });
  },

  splitRectIntoSquares: function splitRectIntoSquares(width, height, horizontalCount) {
    let aspectRatio = width / height;
    let verticalCount = Math.round(horizontalCount / aspectRatio);
    let horizontalPixelPerSquare = Math.round(width / horizontalCount);
    let verticalPixelPerSquare = Math.round(height / verticalCount);

    let squareArray = [];
    for (let i = 0; (i + 1) * horizontalPixelPerSquare < width; i++) {
      for (let j = 0; (j + 1) * verticalPixelPerSquare < height; j++) {
        squareArray.push({
          startWidth: i * horizontalPixelPerSquare,
          startHeight: j * verticalPixelPerSquare,
          endWidth: (i + 1) * horizontalPixelPerSquare,
          endHeight: (j + 1) * verticalPixelPerSquare
        });
      }
    }

    let boundaryWidth = squareArray[squareArray.length - 1].endWidth;
    let boundaryHeight = squareArray[squareArray.length - 1].endHeight;

    if (boundaryWidth < width) {
      for (let j = 0; (j + 1) * verticalPixelPerSquare < height; j++) {
        squareArray.push({
          startWidth: boundaryWidth,
          startHeight: j * verticalPixelPerSquare,
          endWidth: width,
          endHeight: (j + 1) * verticalPixelPerSquare
        })
      }
    }

    let lastSquareStartHeight = squareArray[squareArray.length - 1].endHeight;

    if (boundaryHeight < height) {
      for (let i = 0; (i + 1) * horizontalPixelPerSquare < width; i++) {
        squareArray.push({
          startWidth: i * horizontalPixelPerSquare,
          startHeight: boundaryHeight,
          endWidth: (i + 1) * horizontalPixelPerSquare,
          endHeight: height
        })
      }
    }

    let lastSquareStartWidth = squareArray[squareArray.length - 1].endWidth;

    squareArray.push({
      startWidth: lastSquareStartWidth,
      startHeight: lastSquareStartHeight,
      endWidth: width,
      endHeight: height
    })

    return squareArray;
  }
}
