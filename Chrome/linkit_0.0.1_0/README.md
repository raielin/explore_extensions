##link-IT! Chrome Extension
Simple sample extension that finds the first external link on a page and opens it in a new tab.
https://robots.thoughtbot.com/how-to-make-a-chrome-extension

###New Tab Logic Explained
The `chrome.tabs` API can only be used by `background.js`. But `background.js` can only open the tab; it can't grab the URL. More message passing is needed. We need a click on the browser action to trigger `background.js` to send a message to `content.js`, which will send a URL back to `background.js`, which will open a new tab with the given URL.

Or, more specifically:

* Listen for a click on the browser action in background.js. Once clicked, send a `clicked_browser_action` event to `content.js`.
* When `content.js` receives the event, it grabs the URL of the first link on the page, then sends `open_new_tab` back to background.js with the URL to open.
* `background.js` listens for `open_new_tab` and opens a new tab with the given URL when it receives the message.

