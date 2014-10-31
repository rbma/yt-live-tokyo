'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:exitTwitter
 * @description
 * # exitTwitter
 */
angular.module('youtubeStreamApp')
  .directive('exitTwitter', function () {

  	var link = function($scope, element, attrs){

  		element.click(function(){
  			$('.tweet-container').remove();
  			element.remove();

  		});
  	};

  	return{
  		link: link
  	};


  });