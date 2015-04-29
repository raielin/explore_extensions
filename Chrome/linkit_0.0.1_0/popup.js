'use strict';

$(document).ready(function() {
  // console.log("document ready!"); // for testing use only.

  var linksList;

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

// Listen for message from content that includes list of URLs to insert into popup view.
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if ((request.from === "content") && (request.message === "linksList_success")) {
        linksList = request.linksList;
        // console.log(request.linksList);  // for testing use only
        populateLinksList(request.linksList);
      }
    }
  );

  document.getElementById("button").onclick = function() {
    goLinkIt(linksList);
  };
});


// Function to insert URLs into popup HTML.
// Takes an array of URLs as a parameter, creates list of URLs in popup view.
function populateLinksList(urls) {

}

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
