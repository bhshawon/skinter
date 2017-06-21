const mutationObserver = new MutationObserver(function (mutations) {
  mutations.forEach(mutation => {
    if (mutation.addedNodes) {
      let addedNodes = $(mutation.addedNodes)
      let images = addedNodes.find('img');
      images.each(processImage);
    }
  })
});

const options = {
  subtree: true,
  childList: true
}
