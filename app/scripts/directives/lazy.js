/*global $:false */

'use strict';

/**
 * @ngdoc directive
 * @name youtubeStreamApp.directive:lazy
 * @description
 * # lazy
 */
angular.module('youtubeStreamApp').directive('lazy', ['$rootScope', '$timeout', function ($rootScope, $timeout) {


	var init = function($el){
		var width = $el.data('width');
		var height = $el.data('height');
		var ratio = $el.data('ratio');
		var id = $el.data('youtube-id');
		var aspectRatio = ['16', '9'];
		var paddingTop = 0;
		var youtubeParameters = $el.data('parameters') || '';

		if (typeof width === 'undefined' || typeof height === 'undefined'){
			height = 0;
			width = '80%';
			aspectRatio = (ratio.split(":")[1] / ratio.split(":")[0]) * 100;
			paddingTop = aspectRatio + '%';
		}

		$el.css({
			'position': 'relative',
			'height': height,
			'width': width,
			'padding-top': paddingTop,
			'background': 'url(//img.youtube.com/vi/' + id + '/hqdefault.jpg) center center no-repeat',
			'cursor': 'pointer',
			'background-size': 'cover'
		}).html('<p id="lazyYT-title-' + id + '" class="lazyYT-title"></p><div class="lazyYT-button"></div>')
		.addClass('lazyYT-image-loaded');

		$.getJSON('https://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json', function (data) {
			$('#lazyYT-title-' + id).text(data.entry.title.$t);
		});


		$el.on('click', function (e) {
			e.preventDefault();
			if (!$el.hasClass('lazyYT-video-loaded') && $el.hasClass('lazyYT-image-loaded')) {
				$el.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?autoplay=1&' + youtubeParameters + '" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>')
					.removeClass('lazyYT-image-loaded')
					.addClass('lazyYT-video-loaded');
		  }
		});
	};

	$.fn.lazyYT = function(){
		return this.each(function(){
			var $el = $(this).css('cursor', 'pointer');
			init($el);
		});
	};
	
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
