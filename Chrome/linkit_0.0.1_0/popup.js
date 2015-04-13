'use strict';

window.onload = function() {
  // alert('go link-IT!');  // for testing use only
  document.getElementById("button").onclick = function() {
    goLinkIt();
  };
};

// send message to background.js
var goLinkIt = function() {
  chrome.runtime.sendMessage({
    from: "popup",
    message: "go_link_it"
  });
}
