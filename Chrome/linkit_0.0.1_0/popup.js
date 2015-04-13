'use strict';

window.onload = function() {

  // alert('go link-IT!');  // for testing use only
  document.getElementById("button").onclick = function() {
    // On browser action, send message to background.js
    chrome.runtime.sendMessage({
      from: "popup",
      message: "go_link_it"
    });
  };
};
