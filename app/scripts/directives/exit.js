/*global $:false */
'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:exit
 * @description
 * # exit
 */
angular.module('youtubeStreamApp')
  .directive('exit', function () {

  	var link = function($scope, element){
  		element.click(function(){
  			$('.about').transition({
  				top: '-100%'
  			});
  		});

  	};

  	return{
  		link: link
  	};
 
  });
