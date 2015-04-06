// background.js
// Use listeners to get input from user and send it to content script which has access to DOM elements

// omnibox
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      {
        content: "color-divs",
        description: "Make everything happi!"
      }
    ]);
  }
);

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    if (text == "color-divs") {
      colorDivs();
    }
  }
);

// listening for an event / one-time request
// coming from pop-up
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.type) {
      case "color-divs": colorDivs();
      break;
    }
    return true;
  }
);

// listening for an event / long-lived connections
// coming from devtools
// not necessary to be long-lived connection, only for educational purposes.
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    switch(port.name) {
      case "color-divs-port": colorDivs();
      break;
    }
  });
});

// send a message to the content script
// select tab then send message to it.
var colorDivs = function() {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id {
      type: "colors-div",
      color: "#F00"
    });
    // setting a badge for extension icon
    chrome.browserAction.setBadgeText({
      text: "happi!"
    });
  });
};
