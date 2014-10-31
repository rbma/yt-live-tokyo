'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:info
 * @description
 * # info
 */
angular.module('youtubeStreamApp')
  .directive('info', function () {

  	var link = function($scope, element, attrs){

  		element.click(function(){
  			$('.about').transition({
  				top: 0
  			});

  		});
  	};

  	return{
  		link: link
  	};

  });

