// browseraction/popup.js
window.onload = function() {
  document.getElementById("button").onclick = function() {
    chrome.extension.sendMessage({
      type: "color-divs"
    });
  }
}

// Extension pop-up contains a single button. Once user clicks it, popup.js will send a message to the background script.
