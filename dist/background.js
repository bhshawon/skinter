chrome.browserAction.onClicked.addListener(function(){chrome.tabs.query({active:!0,currentWindow:!0},function(a){chrome.tabs.sendMessage(a[0].id,{command:"append"},function(a){console.log(a.result)})})});