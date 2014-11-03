/*global $:false */

'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:sizeVideo
 * @description
 * # sizeVideo
 */

angular.module('youtubeStreamApp').directive('sizeVideo', ['$rootScope', function ($rootScope) {
	
	
	var ratio = 16/9;
	var width = $(window).width();
	var height = $(window).height();
	var winRatio = width / height;

	
	
	var moveElement = function(element){

		width = $(window).width();
		height = $(window).height();
		var pWidth, pHeight;

		var frame = element.find('iframe');

		if (width / ratio < height){
			pWidth = Math.ceil(height * ratio);
			frame.width(pWidth).height(height).css({
				left: (width - pWidth) / 2,
				top: 0
			});
		}

		else{
			pHeight = Math.ceil(width / ratio);
			frame.width(width).height(pHeight).css({
				left: 0,
				top: (height - pHeight) / 2
			});
		}

	};



	var link = function($scope, element){

		//wait until YT is ready
		$rootScope.$on('videoOn', function(){
			moveElement(element);
		});

		

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
}]);
