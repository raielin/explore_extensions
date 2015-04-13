// content.js
// NOTE: Do not need to check if document has loaded before running content script. Chrome default injects content scripts only after DOM is complete. (https://developer.chrome.com/extensions/content_scripts#run_at)

// ======== VERSION 0.1 ==========
// // Create simple alert to test extension
// alert("Hello from link-IT!")

// ======== VERSION 0.2 ==========
// // Use jQuery to log first external link on a page.
// var firstHref = $("a[href^='http']").eq(0).attr("href");

// alert("link-IT: " + firstHref);

// ======== VERSION 0.3 ==========
// // Listen for message from background.js
// // only run code inside listener when payload is received.
// // simple version - no message being sent back to background.js
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if(request.message === "clicked_browser_action") {
//       var firstHref = $("a[href^='http']").eq(0).attr("href");
//       var activate = window.confirm("link-IT to " + firstHref + "?");
//       if (activate) {
//         console.log("link-IT!");
//       } else {
//         console.log("nada.");
//       }
//     }
//   }
// );

// ======== VERSION 0.4 ==========
// Listen for message from background.js that indicates we should pull the first URL from the current page
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if ((request.from === "background") && (request.message === "clicked_browser_action")) {
      // Use jQuery to select `a` tag  at `.eq(0)` or first indexed position and store value of `href` property.
      var firstHref = $("a[href^='http'").eq(4).attr("href");
      var activate = window.confirm("link-IT to " + firstHref + "?");

      // If user confirms activation, send message back to background.js to open new tab with URL from current page. Otherwise, cancel and do nothing.
      if (activate) {
        chrome.runtime.sendMessage({
          from: "content",
          message: "open_new_tab",
          url: firstHref
        });
      }
    }
  }
);
