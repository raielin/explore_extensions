##Chrome Extensions
Sample extensions, practice code, and general notes and instructions for creating Chrome Extensions.

###General
* Installed extensions location: `~/Library/Application Support/Google/Chrome/Default/Extensions`
* Can be built using almost only HTML, CSS, and JavaScript.

###Chrome Extension Architecture
![chrome extension architecture](https://s3.amazonaws.com/uploads.hipchat.com/39979/1226495/bKAkxAZiXwyy1YD/architecture.png "chrome extension architecture")

**manifest.json**
* Entry point of extension. Required properties: `name`, `version`, and `manifest_version`.

**background pages**
* Every extension has an invisible background page that is run by browser.
* Recommendation is to use an event page as a background page, as opposed to a persistent background which is active continually.
* Holds extension's main logic and initialization - acts like a bridge between other parts of the extension

**content script**
* Gives access to current page's DOM.
* Runs code within context of current page and will be executed with every page refresh.

**user interface**
* Multiple options to build extension UI.
    - Browser Action
    - Page Action
    - DeveloperTools (allows you to add new tab to Chrome's native DeveloperTools)
    - Omnibox

###Loading Extension for Testing
* Go to `chrome://extensions` in Chrome browser.
* check **Developer mode**.
* click **Load unpacked extension...**.
* Select extension project folder.

###References & Resources
* Google's developer page: https://developer.chrome.com/extensions.
* http://code.tutsplus.com/tutorials/developing-google-chrome-extensions--net-33076 (5 Jul 2013)

