'use strict';

describe('Directive: exit', function () {

  // load the directive's module
  beforeEach(module('youtubeStreamApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<exit></exit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the exit directive');
  }));
});
