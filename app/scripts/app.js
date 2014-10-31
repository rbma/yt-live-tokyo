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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
