const mutationObserver = new MutationObserver(function (mutations) {
  for (let mutation of mutations) {
    if (mutation.addedNodes) {
      let addedNodes = $(mutation.addedNodes)
      let images = addedNodes.find('img');
      images.each(processImage);
    }
  }
});

const options = {
  subtree: true,
  childList: true
}
