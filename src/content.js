'use strict';

console.log('Content script running');

// const fileSystemManager = new FileSystemManager();

let documentImages = $('img');
documentImages.hide();
documentImages.removeAttr('srcset');
$(function () {
  documentImages.each(processImage);
})

const mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(mutation => {
    if (mutation.addedNodes) {
      let addedNodes = $(mutation.addedNodes)
      let images = addedNodes.find('img');
      images.each(processImage);
    }
  })
});

// const target = document.getElementsByTagName('body');
const options = {
  subtree: true,
  childList: true
}

mutationObserver.observe(document, options);


function processImage(i, elem) {
  let imageDom = $(this);
  let imageSrc = elem.src;
  imageDom.removeAttr('src');

  Jimp.read(imageSrc, function (err, img) {
    if (!err) {
      filterSkin(img);
      outputMethod.outputImage(img, imageDom);
    }
  });
}

function filterSkin(img) {
  let width = img.bitmap.width;
  let height = img.bitmap.height;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let color = Jimp.intToRGBA(img.getPixelColor(i, j));

      if (detectionMethod.isSkinColor(color)) {
        img.setPixelColor(transformedSkinColor, i, j);
      }
    }
  }
}


