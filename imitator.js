/* global adobe DPS */

adobeDPS = (function (adobeDPS) {
  'use strict';

  var urlParams;

  if (typeof adobeDPS === 'undefined') {
    throw new Error('AdobeLibraryAPI.js must be installed. Download from www.adobe.com/go/dps-library-store-api');
  }

  function extend (adobeDPS) {
    var delay = 100;

    if (urlParams.imitate !== '') {
      delay = parseInt(urlParams.imitate, 10);
    }

    adobeDPS.imitation = {
      state: true,
      info: 'This adobeDPS object is extended by ngdps.imitator; Do not trust it! I hope you know, what you are doing?'
    };

    window.setTimeout(function () {
      console.log('NGDPS.imitation initialized after ', delay, 'ms.');
      adobeDPS.initializationComplete.dispatch();
    }, delay);

    return adobeDPS;
  }

  function isImitate () {
    if (typeof urlParams.imitate !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  return (function (adobeDPS) {
    var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1);

    urlParams = {};
    while((match = search.exec(query)) !== null) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    if (isImitate()) {
      return extend(adobeDPS);
    } else {
      return adobeDPS;
    }

  })(adobeDPS);

})(adobeDPS);