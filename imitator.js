/* global adobeDPS */

if (typeof adobeDPS === 'undefined') {
  throw new Error('AdobeLibraryAPI.js must be installed. Download from www.adobe.com/go/dps-library-store-api');
}

adobeDPS.ngdpsImitator = {
  imitate: function (delay) {
    'use strict';

    var getPreviewImage = function(width, height, isPortrait) {
      var imageUrl = 'http://placehold.it/2048x1536.png',
        transaction;
      width = null;
      height = null;
      isPortrait = null;

      window.setTimeout((function (that, url) {
        that.previewImageURL = url;
      })(this, imageUrl), 1000);

      transaction = {
        completedSignal: {
          add: function (callback) {
            window.setTimeout((function (url, fn) {
              var transaction = {
                previewImageURL: url
              };
              fn(transaction);
            })(imageUrl, callback), 1000);
          }
        }
      };

      return transaction;

    };

    if (typeof delay === 'undefined') {
      delay = 100;
    }

    adobeDPS.ngdpsImitator.state = true;
    adobeDPS.ngdpsImitator.info = 'This adobeDPS object is extended by ngdps.imitator; Do not trust it! I hope you know, what you are doing?';

    window.setTimeout(function () {
      var guid;
      console.log('NGDPS.imitation initialized after ', delay, 'ms.');
      adobeDPS.initializationComplete.dispatch();

      for (var i = 0; i < 50; i += 1) {
        guid = 'id-' + i;
        adobeDPS.libraryService.folioMap.internal[guid] = {
          id: guid,
          productId: 'com.geildanke.' + i,
          publicationDate: new Date(1414099620000 - (Math.random() * 10000000000)),
          getPreviewImage: getPreviewImage,
          title: 'Imitatator Title ' + i,
          broker: 'appleStore'
        };
      }
    }, delay);
  }
};

/* load with string */
(function (adobeDPS) {
  'use strict';

  var urlParams;

  function isImitate() {
    if (typeof urlParams.imitate !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  (function (adobeDPS) {
    var match,
      pl = /\+/g, // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
      },
      query = window.location.search.substring(1);

    urlParams = {};
    while ((match = search.exec(query)) !== null) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    if (isImitate()) {
      adobeDPS.ngdpsImitator.imitate();
    }

  })(adobeDPS);

})(adobeDPS);