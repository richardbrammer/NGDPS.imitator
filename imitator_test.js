/* global adobeDPS, beforeEach, browser, describe, expect, it, waitsFor */

describe('NGPDS.imitator', function () {
  'use strict';

  it('appends imitator state to adobeDPS.', function () {
    adobeDPS.ngdpsImitator.imitate();
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
      thisDate;

    for (var key in adobeDPS.libraryService.folioMap.internal) {

      expect(typeof adobeDPS.libraryService.folioMap.internal[key].id).toBe('string');
      expect(typeof adobeDPS.libraryService.folioMap.internal[key].productId).toBe('string');
      expect(typeof adobeDPS.libraryService.folioMap.internal[key].title).toBe('string');
      expect(typeof adobeDPS.libraryService.folioMap.internal[key].broker).toBe('string');

      expect(typeof adobeDPS.libraryService.folioMap.internal[key].getPreviewImage).toBe('function');
      //expect(typeof adobeDPS.libraryService.folioMap.internal[key].verifyContentPreviewSupported).toBe('function');
      //expect(typeof adobeDPS.libraryService.folioMap.internal[key].updatedSignal).toBe('function');

      // date checking

      thisDate = adobeDPS.libraryService.folioMap.internal[key].publicationDate;
      expect(thisDate instanceof Date).toBe(true);
      expect(thisDate).not.toBe(lastDate);
      lastDate = adobeDPS.libraryService.folioMap.internal[key].publicationDate;
    }
  });

  it('adds function getPreviewImage(), which should attach an image URL to previewImageUrl', function () {
    var folioId;

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      folioId = key;
      break;
    }

    adobeDPS.libraryService.folioMap.internal[folioId].getPreviewImage();

    waitsFor(function () {
      return (typeof adobeDPS.libraryService.folioMap.internal[folioId].previewImageURL === 'string');
    }, 'an image URL returned', 2000);

  });

  it('adds function getPreviewImage(), which should return a signal, that on completedSignal fire added callbacks', function () {
    var folioId;

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      folioId = key;
      break;
    }

    adobeDPS.libraryService.folioMap.internal[folioId].getPreviewImage().completedSignal.add(function (transaction) {
      expect(typeof transaction.previewImageURL).toBe('string');
    });


  });
});