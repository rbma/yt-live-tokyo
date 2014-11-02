'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('youtubeStreamApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    //create a new instance of the frame controller
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  //youtube
  it ('should have youtube available', function(){
    expect(scope.player).toBeDefined();
  });

});

describe('E2E controllers:', function(){

  beforeEach(function(){
    browser().navigateT('/#/');

  });

});
