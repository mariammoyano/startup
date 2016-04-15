'use strict';

describe('services', function() {

  beforeEach(module('movieApp'));

  
  it('check the existence of Movie factory', inject(function(MovieFactory) {
      expect(MovieFactory).toBeDefined();
    }));
  it('check the existence of LocalStorage service', inject(function(LStorage) {
      expect(LStorage).toBeDefined();
    }));
});