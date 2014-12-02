/* global adobeDPS, beforeEach, browser, describe, expect, it, runs, waitsFor */

describe('NGPDS.imitator', function () {
  'use strict';

  it('appends imitator state to adobeDPS.', function () {
    adobeDPS.ngdpsImitator.imitate(10);
    expect(typeof adobeDPS.ngdpsImitator.state).not.toBe('undefined');
  });

  it('appends folios to the internal folioMap of libraryService.', function () {

    waitsFor(function () {
      for (var key in adobeDPS.libraryService.folioMap.internal) {
        key = null;
        return true;
      }
    }, 'at least one folio added to internal folioMap.', 5000);


  });

  it('adds folios with proper attributes.', function () {
    var lastDate = new Date(0),
      thisDate,
      internal = adobeDPS.libraryService.folioMap.internal,
      folio = {};

    for (var key in internal) {
      folio = internal[key];

      // DCFS issue id
      expect(folio.id).toBe(key);

      // primitives
      expect(typeof folio.broker).toBe('string');
      expect(typeof folio.description).toBe('string');
      expect(typeof folio.downloadSize).toBe('number');
      expect(typeof folio.filter).toBe('string');
      expect(typeof folio.folioDescription).toBe('string');
      expect(typeof folio.folioNumber).toBe('string');
      expect(typeof folio.price).toBe('string');
      expect(typeof folio.productId).toBe('string');
      expect(typeof folio.targetDimensions).toBe('string');
      expect(typeof folio.title).toBe('string');
      expect(folio.previewImageURL).toBe(null); // when the API starts, this attribute is always null
      expect(folio.receipt).toBe(null);

      // booleans
      expect(typeof folio.hasSections).toBe('boolean');
      expect(typeof folio.isArchivable).toBe('boolean');
      expect(typeof folio.isCompatible).toBe('boolean');
      expect(typeof folio.isDownloadable).toBe('boolean');
      expect(typeof folio.isPurchasable).toBe('boolean');
      expect(typeof folio.isThirdPartyEntitled).toBe('boolean');
      expect(typeof folio.isUpdatable).toBe('boolean');
      expect(typeof folio.isViewable).toBe('boolean');
      expect(typeof folio.supportsContentPreview).toBe('boolean');

      // objects
      expect(typeof folio.sections).toBe('object');
      expect(typeof folio.updatedSignal).toBe('object');

      // arrays
      expect(Array.isArray(folio.currentTransactions)).toBe(true);

      // date checking
      thisDate = folio.publicationDate;
      expect(thisDate instanceof Date).toBe(true);
      expect(thisDate).not.toBe(lastDate);
      lastDate = folio.publicationDate;

      // functions
      expect(typeof folio.archive).toBe('function');
      expect(typeof folio.canDownloadContentPreview).toBe('function');
      expect(typeof folio.currentStateChangingTransaction).toBe('function');
      expect(typeof folio.download).toBe('function');
      expect(typeof folio.downloadContentPreview).toBe('function');
      expect(typeof folio.getPreviewImage).toBe('function');
      expect(typeof folio.getSections).toBe('function');
      expect(typeof folio.isFree).toBe('function');
      expect(typeof folio.purchase).toBe('function');
      expect(typeof folio.update).toBe('function');
      expect(typeof folio.updatedSignal.add).toBe('function');
      expect(typeof folio.verifyContentPreviewSupported).toBe('function');
      expect(typeof folio.view).toBe('function');

      // states
      expect(typeof folio.contentPreviewState).toBe('number');
      expect(typeof folio.state).toBe('number');
    }
  });

  it('adds function getPreviewImage(), which should attach an image URL to previewImageUrl', function () {
    var folioId,
      transaction,
      img = new Image();

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      folioId = key;
      break;
    }

    transaction = adobeDPS.libraryService.folioMap.internal[folioId].getPreviewImage();

    expect(typeof transaction.completedSignal).not.toBe('undefined');
    expect(typeof transaction.completedSignal.add).toBe('function');
    expect(typeof transaction.completedSignal.addOnce).toBe('function');

    transaction.completedSignal.add(function (transaction) {
      expect(typeof transaction.previewImageURL).toBe('string');
    });

    waitsFor(function () {
      return (typeof adobeDPS.libraryService.folioMap.internal[folioId].previewImageURL === 'string');
    }, 'an image URL returned', 1000);

    runs(function () {
      img.src = adobeDPS.libraryService.folioMap.internal[folioId].previewImageURL;
    });

    waitsFor(function () {
      return img.complete;
    }, 'image loading', 1000);


  });

  it('adds a function canDownloadContentPreview to folios, that returns true', function () {

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      expect(adobeDPS.libraryService.folioMap.internal[key].canDownloadContentPreview()).toBe(true);
    }

  });

  it('adds an attribute updatedSignal to folio, that callbacks functions added via add(), some time later', function () {
    var folioId;

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      folioId = key;
      break;
    }

    waitsFor(function () {
      var fired = false;

      adobeDPS.libraryService.folioMap.internal[folioId].updatedSignal.add(function () {
        fired = true;
      });

      return fired;
    }, 'the callback to be fired.', 10000);


  });

  it('has a configurationService with valid data', function () {
    expect(typeof adobeDPS.configurationService).toBe('object');
    expect(adobeDPS.configurationService.adobeApplicationVersion).toBe(null);
    expect(adobeDPS.configurationService.applicationContext).toBe(null);
    expect(typeof adobeDPS.configurationService.applicationContextUpdatedSignal).toBe('object');
    expect(typeof adobeDPS.configurationService.applicationID).toBe('string');
    expect(typeof adobeDPS.configurationService.applicationStateTypes).toBe('object');
    expect(typeof adobeDPS.configurationService.applicationStates).toBe('object');
    expect(typeof adobeDPS.configurationService.applicationVersion).toBe('string');
    expect(typeof adobeDPS.configurationService.callbacks).toBe('object');
  });

});