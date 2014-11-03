/*global $:false */

'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:sizeVideo
 * @description
 * # sizeVideo
 */

angular.module('youtubeStreamApp').directive('sizeVideo', function () {
	
	
	var ratio = 16/9;
	var width = $(window).width();
	var height = $(window).height();
	var winRatio = width / height;

	
	
	var moveElement = function(element){

		if (winRatio < ratio){
			
			var diff = ratio - winRatio;

			element.css({
				marginTop: diff * 25 + '%'
			});
		}
		if (winRatio >= ratio){
			element.css({
				marginTop: 0
			});
		}
	};



	var link = function($scope, element){

		moveElement(element);

		$(window).resize(function(){
			
			width = $(window).width();
			height = $(window).height();
			winRatio = width / height;
			moveElement(element);

		});

	};


	return {
		link: link
	};
});
