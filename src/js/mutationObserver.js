const mutationObserver = new MutationObserver(function (mutations) {
  for (let mutation of mutations) {
    if (mutation.addedNodes) {
      let addedNodes = $(mutation.addedNodes)
      let imageElements = addedNodes.find('img');
      // let backgroundImages = utils.getBackgroundImages(addedNodes);
      // let addedImages = $.merge(imageElements, backgroundImages);

      imageElements.each(function (i, elem) {
        let imageDom = $(this);
        processImage(imageDom);
      });
    }
  }
});

const options = {
  subtree: true,
  childList: true
}
