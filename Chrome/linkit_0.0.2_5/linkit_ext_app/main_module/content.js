'use strict';

// content.js

// ======== VERSION 0.5 ==========
// // Deprecate JS "confirm" alert and make user selection and request happen directly in popup.

// // Listen for message from popup script that tells content script to scrape DOM for valid URLS
// // TODO: consider possibility of utilizing sendResponse object to handle passing of linksList array?

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if ((request.from === "popup") && (request.message === "popup_ready")) {

//       var linksList = getURLS();

//       chrome.runtime.sendMessage({
//         from: "content",
//         message: "linksList_success",
//         linksList: linksList
//       });
//     }
//   }
// );

// // Scrape DOM for first 10 valid URLs, add each URL to end of urls array. Returns urls array.
// function getURLS() {
//   var urls = [];
//   for (var i = 0; urls.length < 11 && i < 10; i++) {
//     var href = $("a[href^='http'").eq(i).attr("href");

//     if (href != undefined) {
//       urls.push(href);
//     }
//   }

//   return urls;
// }

// ======== VERSION 0.6 ==========
