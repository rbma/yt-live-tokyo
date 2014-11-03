'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:lazy
 * @description
 * # lazy
 */
angular.module('youtubeStreamApp').directive('lazy', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	
	var setup = function(element, attrs){
		var id = attrs.videoid;
		element.data('youtube-id', id);
		element.lazyYT();
	};


	var link = function($scope, element, attrs){
		$timeout(function(){
			setup(element, attrs);
		},1000);
		
	};

	return {
		link: link
	};
}]);
