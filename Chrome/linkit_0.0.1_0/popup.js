'use strict';

$(document).ready(function() {

  var linksList;
  // alert('go link-IT!');  // for testing use only

  // Find active tab in order to send a message to content script
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    // send message to content script in activeTab
    function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        from: "popup",
        message: "popup_ready"
      });
    }
  );

  document.getElementById("button").onclick = function() {
    goLinkIt();
  };
});

// send message to background.js to open selected url in new tab
// using list of URLs as parameter here as a hack for now. Need to map through HTML elements instead and grab text value of selected table row.
function goLinkIt(urls) {
  for (var i = 0; i < urls.length; i++) {
    if (document.getElementById("check" + i).checked) {
      chrome.tabs.create({
        url: urls[i]
      });
    }
  }
}
