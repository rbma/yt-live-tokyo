'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:videoBlock
 * @description
 * # videoBlock
 */
angular.module('youtubeStreamApp')
  .directive('videoBlock', function () {
    
    var link = function($scope, element, attrs){
    	var videoId = attrs.videoId;

    	$.okvideo({video: videoId, autoplay: true, volume: 50});

    };


    return {
      link: link
    };



  });
