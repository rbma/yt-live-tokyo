'use strict';

/**
 * @ngdoc overview
 * @name youtubeStreamApp
 * @description
 * # youtubeStreamApp
 *
 * Main module of the application.
 */
angular
  .module('youtubeStreamApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-contentful'
  ])
  .config(function ($routeProvider, contentfulClientProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


    contentfulClientProvider.setSpaceId('4xlwm16911zp');
    contentfulClientProvider.setAccessToken('6fe66430d43042a7c28777422e4ae6f8edf5f58bf05d46a072e92a83bf432dab');


  });
