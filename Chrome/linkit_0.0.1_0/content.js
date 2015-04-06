// content.js
// NOTE: Do not need to check if document has loaded before running content script. Chrome default injects content scripts only after DOM is complete. (https://developer.chrome.com/extensions/content_scripts#run_at)

// Create simple alert to test extension
// alert("Hello from link-IT!")

// Use jQuery to log first external link on a page.
var firstHref = $("a[href^='http']").eq(0).attr("href");

alert("link-IT: " + firstHref);
