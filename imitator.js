/* global adobeDPS */
/* jslint bitwise: true */

if (typeof adobeDPS === 'undefined') {
  throw new Error('AdobeLibraryAPI.js must be installed. Download from www.adobe.com/go/dps-library-store-api');
}

adobeDPS.ngdpsImitator = {
  imitate: function (delay) {
    'use strict';

    var _randomizeGuid = function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    };


    var getPreviewImage = function (width, height, isPortrait) {
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
                state: 400, // no error
                previewImageURL: url
              };
              fn(transaction);
            })(imageUrl, callback), 1000);
          }
        }
      };

      return transaction;

    };


    var verifyContentPreviewSupported = function () {
      var transaction;

      // http://www.adobe.com/devnet-docs/digitalpublishingsuite/DPSViewerSDK-2.32/docs/library/symbols/adobeDPS-FolioContentPreviewState.html
      this.contentPreviewState = 1;

      window.setTimeout((function (that) {
        that.contentPreviewState = 3;
        that.supportsContentPreview = true;
      })(this), 500);

      transaction = {
        completedSignal: {
          add: function (callback) {
            window.setTimeout((function (fn) {
              var transaction = {
                state: 400 // no error
              };
              fn(transaction);
            })(callback), 1000);
          }
        }
      };

      return transaction;
    };


    var canDownloadContentPreview = function () {
      return true;
    };


    var updatedSignal = {
      add: function (callback) {
        window.setInterval((function (fn) {
          fn();
        })(callback), 50000 * Math.random());
      },
      addOnce: function (callback) {
        window.setTimeout((function (fn) {
          fn();
        })(callback), 50000 * Math.random());
      }
    };


    if (typeof delay !== 'number') {
      delay = parseInt(delay, 10) || 100;
      // delay = 100;
    }

    adobeDPS.ngdpsImitator.state = true;
    adobeDPS.ngdpsImitator.info = 'This adobeDPS object is extended by ngdps.imitator; Do not trust it! I hope you know, what you are doing?';

    window.setTimeout(function () {
      var guid;
      console.log('NGDPS.imitation initialized after', delay, 'ms.');
      adobeDPS.initializationComplete.dispatch();

      for (var i = 0; i < 50; i += 1) {
        guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, _randomizeGuid);
        adobeDPS.libraryService.folioMap.internal[guid] = {
          id: guid,
          productId: 'com.geildanke.ngdps.imitator.' + i,
          publicationDate: new Date(1414099620000 - (Math.random() * 10000000000)),
          getPreviewImage: getPreviewImage,
          title: 'Imitatator Title ' + i,
          broker: 'appleStore',
          canDownloadContentPreview: canDownloadContentPreview,
          contentPreviewState: 0,
          updatedSignal: updatedSignal,
          supportsContentPreview: false,
          verifyContentPreviewSupported: verifyContentPreviewSupported
        };
      }
    }, delay);
  }
};

/* load with string */
(function (adobeDPS) {
  'use strict';

  var urlParams;

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

    if (typeof urlParams.imitate !== 'undefined') {
      adobeDPS.ngdpsImitator.imitate(urlParams.imitate);
    }

  })(adobeDPS);

})(adobeDPS);