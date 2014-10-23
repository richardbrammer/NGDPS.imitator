/* global adobeDPS, beforeEach, browser, describe, expect, it */

describe('imitator', function() {
  'use strict';

  it('should append imitator state to adobeDPS', function() {
    adobeDPS.ngdpsImitator.imitate();
    expect(typeof adobeDPS.ngdpsImitator.state).not.toBe('undefined');
  });
});