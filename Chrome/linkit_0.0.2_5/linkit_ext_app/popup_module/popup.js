'use strict';

angular.module('linkIT', []);

$(document).ready(function() {
  $(document).on('click', '#add_link', function() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    },
    function(tabs) {
      // console.log(tabs[0].title + ': ' + tabs[0].url);  // for testing use

      chrome.extension.sendMessage({
        from: 'popup',
        action: 'add',
        data: {
          title: tabs[0].title,
          url: tabs[0].url
        }
      });

      // Reload popup after adding new link.
      // location.reload() can take a parameter. Default is `false` which means the window reloads from the browser cache; true will reload window from server.
      location.reload();
    });
  });
});
