/*global YT:false */
'use strict';

/**
 * @ngdoc service
 * @name youtubeStreamApp.youtube
 * @description
 * # youtube
 * Factory in the youtubeStreamApp.
 */
angular.module('youtubeStreamApp')
  .factory('youtube', ['$rootScope', function ($rootScope) {

    //global player ref
    var player;


    var init = function(video){
      //set up all the stuff
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      
      //listen
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
          videoId: video,
          playerVars:{
            hd: 1,
            controls: 0,
            modestbranding: 0,
            showinfo: 0
          },
          events: {
            'onReady': onPlayerReady
          }
        });
      };

      var onPlayerReady = function(event){
        event.target.mute();
        event.target.playVideo();
        $rootScope.$broadcast('videoOn', player);
      };


    }; //end init

   




    return {
      init: function(video) {
        return init(video);
      }
    };




  }]);


