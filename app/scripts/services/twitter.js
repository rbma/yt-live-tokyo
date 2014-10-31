'use strict';

/**
 * @ngdoc service
 * @name youtubeStreamApp.twitter
 * @description
 * # twitter
 * Factory in the youtubeStreamApp.
 */
angular.module('youtubeStreamApp')
  .factory('twitter', ['$http', function ($http) {


    function init(){
      return $http({
        url: 'http://rbma-twit-core.s3.amazonaws.com/tweets.json'
      });
    }


    // Public API here
    return {
      init: function () {
        return init();
      }
    };


}]);