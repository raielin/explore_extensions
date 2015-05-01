'use strict';

// Used for AngularJS StorageService, but will also need to reuse this class in background script so best to keep it separate.
var linkITStorageService = function() {
  var lsName = 'links';
  var data = localStorage.getItem(lsName) ? JSON.parse(loca`lStorage.getItem(lsName)) : [];
  return {
    get: function() {
      return data;
    },
    add: function(item) {
      this.remove(item.url);
      data.push(item);
      this.save();
    },
    remove: function(url) {
      var idx = null;
      for (var i = 0; i < data.length; i++) {
        if (data[i].url === url) {
          idx = i;
          break;
        }
      }

      if (idx !== null) {
        data.splice(idx, 1);
        this.save();
      }
    },
    save: function() {
      localStorage.setItem(lsName, JSON.stringify(data));
    }
  };
};
