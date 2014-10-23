/* global adobeDPS, beforeEach, browser, describe, expect, it, waitsFor */

describe('imitator', function() {
  'use strict';

  it('should append imitator state to adobeDPS', function() {
    adobeDPS.ngdpsImitator.imitate();
    expect(typeof adobeDPS.ngdpsImitator.state).not.toBe('undefined');
  });

  it('should add folios to the internal folioMap of libraryService', function () {

    waitsFor(function () {
      for (var key in adobeDPS.libraryService.folioMap.internal) {
        console.log(key);
        return true;
      }
    }, 'at least one folio added to internal folioMap.', 5000);

    for (var key in adobeDPS.libraryService.folioMap.internal) {
      expect(typeof adobeDPS.libraryService.folioMap.internal[key].id).not.toBe('undefined');
    }

  });
});