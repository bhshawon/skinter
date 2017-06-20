'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

var documentImages = $('img');
documentImages.hide();
documentImages.removeAttr('srcset');
$(function () {
  documentImages.each(processImage);
});

var mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes) {
      var addedNodes = $(mutation.addedNodes);
      var images = addedNodes.find('img');
      images.each(processImage);
    }
  });
});

// const target = document.getElementsByTagName('body');
var options = {
  subtree: true,
  childList: true
};

mutationObserver.observe(document, options);

function processImage(i, elem) {
  var imageDom = $(this);
  var imageSrc = elem.src;
  imageDom.removeAttr('src');

  Jimp.read(imageSrc, function (err, img) {
    if (!err) {
      filterSkin(img);
      outputMethod.outputImage(img, imageDom);
    }
  });
}

function filterSkin(img) {
  var width = img.bitmap.width;
  var height = img.bitmap.height;

  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var color = Jimp.intToRGBA(img.getPixelColor(i, j));

      if (detectionMethod.isSkinColor(color)) {
        img.setPixelColor(transformedSkinColor, i, j);
      }
    }
  }
}