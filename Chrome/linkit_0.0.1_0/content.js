// content.js
// NOTE: Do not need to check if document has loaded before running content script. Chrome default injects content scripts only after DOM is complete. (https://developer.chrome.com/extensions/content_scripts#run_at)

// Create simple alert to test extension
// alert("Hello from link-IT!")

// Use jQuery to log first external link on a page.
// var firstHref = $("a[href^='http']").eq(0).attr("href");

// alert("link-IT: " + firstHref);

// Listen for message from background.js
// only run code inside listener when payload is received.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "clicked_browser_action") {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      var activate = window.confirm("link-IT to " + firstHref + "?");
      if (activate) {
        console.log("link-IT!");
      } else {
        console.log("nada.");
      }
    }
  }
);
