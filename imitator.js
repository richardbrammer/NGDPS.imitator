/* global adobeDPS */

if (typeof adobeDPS === 'undefined') {
  throw new Error('AdobeLibraryAPI.js must be installed. Download from www.adobe.com/go/dps-library-store-api');
}

adobeDPS.ngdpsImitator = {
  imitate: function (delay) {
    'use strict';

    if (typeof delay === 'undefined') {
      delay = 100;
    }

    adobeDPS.ngdpsImitator.state = true;
    adobeDPS.ngdpsImitator.info = 'This adobeDPS object is extended by ngdps.imitator; Do not trust it! I hope you know, what you are doing?';

    window.setTimeout(function () {
      console.log('NGDPS.imitation initialized after ', delay, 'ms.');
      adobeDPS.initializationComplete.dispatch();

      adobeDPS.libraryService.folioMap.internal['guid-guid-guid'] = {
        id: 'guid-guid-guid'
      };
    }, delay);
  }
};

/* load with string */
(function (adobeDPS) {
  'use strict';

  var urlParams;

  function isImitate () {
    if (typeof urlParams.imitate !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  (function (adobeDPS) {
    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },
      query  = window.location.search.substring(1);

    urlParams = {};
    while((match = search.exec(query)) !== null) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    if (isImitate()) {
      adobeDPS.ngdpsImitator.imitate();
    }

  })(adobeDPS);

})(adobeDPS);