// background.js
// Send an arbitrary JSON payload to current tab. Chose "message" as key but could be anything.

// Called when user clicks on browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send message to active tab
  chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },

  function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      "message": "clicked_browser_action"
    });
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "open_new_tab") {
      chrome.tabs.create({
        "url": request.url
      });
    }
  }
);
