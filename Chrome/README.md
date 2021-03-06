##Chrome Extensions
Sample extensions, practice code, and general notes and instructions for creating Chrome Extensions.

###General
* Installed extensions location: `~/Library/Application Support/Google/Chrome/Default/Extensions`
* Can be built using almost only HTML, CSS, and JavaScript.

###Chrome Extension Architecture
![chrome extension architecture](https://s3.amazonaws.com/uploads.hipchat.com/39979/1226495/bKAkxAZiXwyy1YD/architecture.png "chrome extension architecture")

**manifest.json**
* Entry point of extension. Required properties: `name`, `version`, and `manifest_version`.

**Background Pages**
* Every extension has an invisible background page that is run by browser.
* Recommendation is to use an event page as a background page, as opposed to a persistent background which is active continually.
    - Event pages are only loaded when needed, and unloaded when it goes idle again.
    - Examples of things that cause event page to load:
        + Install or update of extension
        + Event page is listening for event and event is dispatched.
        + A content script or other extension sends a message.
        + Another view in the extension (like a popup) calls [`runtime.getBackgroundPage`](https://developer.chrome.com/extensions/runtime#method-getBackgroundPage)
    - Once loaded, event page will run [as long as it is active](https://developer.chrome.com/extensions/event_pages#lifetime).
    - Event pages [best practices](https://developer.chrome.com/extensions/event_pages#best-practices).
* Holds extension's main logic and initialization - acts like a bridge between other parts of the extension

**Content Script**
* Gives access to current page's DOM.
* Runs code within context of current page and will be executed with every page refresh.

**User Interface**
* Multiple options to build extension UI.
    - Browser Action - icon button next to address bar that allows extension to listen for clicks on that button and then do something.
    - Page Action
    - DeveloperTools (allows you to add new tab to Chrome's native DeveloperTools)
    - Omnibox

###Additional Accessible Features
**Chrome API**
* Look at [documentation](https://developer.chrome.com/extensions/api_index.html).
* Gives access to Chrome bookmarks, history, ability to create tabs, resize windows, etc.

**Message Passing**
* Way for content scripts (sends message) and background scripts (listens for message) to interact. 
* Content script pulls information from current page's DOM via sends message to background script to do something with it.
    - content scripts have access to current page, but cannot listen for clicks on browser action
    - background scripts have access to every Chrome API but cannot access current page.
* One-time requests or long-lived connections both available.

**Override Pages**
* Nice way to customize your browser - can substitute some of Chrome's default pages, i.e. New Tab, History, Bookmarks, etc.

###New Tab Logic Explained
The `chrome.tabs` API can only be used by `background.js`. But `background.js` can only open the tab; it can't grab the URL. More message passing is needed. We need a click on the browser action to trigger `background.js` to send a message to `content.js`, which will send a URL back to `background.js`, which will open a new tab with the given URL.

Or, more specifically:

* Listen for a click on the browser action in background.js. Once clicked, send a `clicked_browser_action` event to `content.js`.
* When `content.js` receives the event, it grabs the URL of the first link on the page, then sends `open_new_tab` back to background.js with the URL to open.
* `background.js` listens for `open_new_tab` and opens a new tab with the given URL when it receives the message.

###Loading Extension for Testing
* Go to `chrome://extensions` in Chrome browser.
* check **Developer mode**.
* click **Load unpacked extension...**.
* Select extension project folder.

###References & Resources
* [Chrome Documentation](https://developer.chrome.com/extensions)
* [happi divs tutorial](http://code.tutsplus.com/tutorials/developing-google-chrome-extensions--net-33076) *(5 Jul 2013)*
* [link-IT! tutorial](https://robots.thoughtbot.com/how-to-make-a-chrome-extension) *(23 Jan 2015)*
* [Message passing b/t background.js and popup.js](http://tipstak.blogspot.com/2014/06/how-to-communicate-between-background-and-popup-on-Chrome-extensions.html) *(02 Jun 2014)*
* [Message passing from content to popup](http://stackoverflow.com/questions/20019958/chrome-extension-how-to-send-data-from-content-script-to-popup-html) *(16 Nov 2013)*

