'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:lazy
 * @description
 * # lazy
 */
angular.module('youtubeStreamApp').directive('lazy', function () {
	var link = function($scope, element, attrs){
		var id = attrs.videoid;
		element.data('youtube-id', id);
		element.lazyYT();
	};

	return {
		link: link
	};
});
