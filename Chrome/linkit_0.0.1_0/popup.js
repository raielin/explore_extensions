'use strict';

$(document).ready(function() {
  // alert('go link-IT!');  // for testing use only
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
