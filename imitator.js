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
      var imageUrl = 'http://i.imgur.com/kH14hwE.png',
        transaction;
      width = null; // width and height are ignored by adobeDPS
      height = null;

      if (isPortrait === true) {
        imageUrl = 'http://i.imgur.com/lcy0ia3.png';
      }

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
          },
          addOnce: function (callback) {
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
          },
          addOnce: this.add
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
    }

    adobeDPS.ngdpsImitator.state = true;
    adobeDPS.ngdpsImitator.info = 'This adobeDPS object is extended by ngdps.imitator; This info should never appear in a production environment. More information: https://github.com/richardbrammer/ngdps.imitator';

    window.setTimeout(function () {
      var guid;
      console.log('NGDPS.imitation initialized after', delay, 'ms.');
      adobeDPS.initializationComplete.dispatch();

      for (var i = 0; i < 50; i += 1) {
        guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, _randomizeGuid);
        adobeDPS.libraryService.folioMap.internal[guid] = {
          id: guid,
          
          // primitives
          broker: 'appleStore',
          description: 'Description field.',
          downloadSize: Math.random() * 100000000,
          folioDescription: 'Folio description field for #' + i + ' folio.',
          folioNumber: 'Imitated Folio ' + i,
          previewImageURL: null,
          price: '$ 2.99',
          productId: 'com.geildanke.ngdps.imitator.' + i,
          supportsContentPreview: false,
          title: 'Imitator Title ' + i,

          // booleans
          isArchivable: false,
          isCompatible: false,
          isDownloadable: false,
          isPurchasable: true,
          isThirdPartyEntitled: false,
          isUpdatable: false,
          isViewable: false,

          // date
          publicationDate: new Date(1414099620000 - (Math.random() * 10000000000)),
          
          // methods
          canDownloadContentPreview: canDownloadContentPreview,
          getPreviewImage: getPreviewImage,
          updatedSignal: updatedSignal,
          verifyContentPreviewSupported: verifyContentPreviewSupported,
          
          // states
          contentPreviewState: 0
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