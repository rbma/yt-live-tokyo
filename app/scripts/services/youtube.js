'use strict';

/**
 * @ngdoc service
 * @name youtubeStreamApp.youtube
 * @description
 * # youtube
 * Factory in the youtubeStreamApp.
 */
angular.module('youtubeStreamApp')
  .factory('youtube', function () {

    //global player ref
    var player;


    var init = function(){
      //set up all the shit
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      
      //listen
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady
          }
        });
      };

      var onPlayerReady = function(event){
        event.target.playVideo();
      };




    }; //end init

   




    return {
      init: function () {
        return init();
      }
    };




  });
