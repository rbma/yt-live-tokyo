'use strict';

/**
 * @ngdoc function
 * @name youtubeStreamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the youtubeStreamApp
 */
angular.module('youtubeStreamApp')
  .controller('MainCtrl', [
  	'$scope',
  	'$rootScope',
  	'$sce',
  	'twitter',
  	'contentfulClient',
  	function ($scope, $rootScope, $sce, twitter, contentfulClient) {

  		var converter = new Showdown.converter();

  		//page id
  		var pageId = '6dfDQTqL16Q48mMo0kYwYs';

  		//empty container
  		$scope.tweets = '';

  		//flags
  		$scope.ready = false;
  		$scope.video = {};
  		$scope.video.playing = false;
  		$scope.video.ready = false;


  		//interval variable
  		var keepChecking = '';

  		var releaseDate = '';

  		//open twitter
  		twitter.init().success(function(data){
  			var tweets = data;
  			var length = tweets.length;

  			for(var i = 0; i < length; i++){
  				$scope.tweets = $scope.tweets + '@' + tweets[i].username + ': ' + tweets[i].tweet + ' ';
  			}

  			$scope.ready = true;

  		}); //end twitter


  		



  		$scope.reload = function(){
  			window.location.reload();
  		};

  		$scope.trust = function(text){
  			return $sce.trustAsHtml(text);
  		}

  		//checks to see if video is now updating
  		var checkTime = function(releaseDate){

  			//episode not out yet
  			if (moment() < releaseDate){
  				var bgImage = $scope.data.fields.eventImage.fields.file.url;

  				$scope.video.ready = true;

  				//set bgimage on body
  				$('body').css({
  					background: 'url(' + bgImage + ') top center',
  					backgroundSize: 'cover'
  				});
  			}

  			//episode out
  			if (moment() >= releaseDate){
  				
  				$scope.video.ready = true;
  				$scope.video.playing = true;

  				clearInterval(keepChecking);

  			}

  		};

  		//get data
  		contentfulClient.entries({'sys.id': pageId, 'include': 10}).then(function(data){

  			$scope.data = data[0];

  			console.log($scope.data);

  			releaseDate = new Date($scope.data.fields.broadcastTime);

  			//episode is not released yet
  			checkTime(releaseDate);
  			keepChecking = setInterval(checkTime(releaseDate), 10000);

  			//render html from markdown
  			$scope.lineup = converter.makeHtml($scope.data.fields.performers);
  			$scope.body = converter.makeHtml($scope.data.fields.bodyText);




  		}); //end data







 }]);




// streamControllers.controller('IndexCtrl', ['$scope','$rootScope','$sce', 'socketService','contentfulClient', ($scope, $rootScope, $sce, socketService, contentfulClient) ->

		


// 		$scope.lineup = converter.makeHtml($scope.data.fields.performers)
// 		$scope.body = converter.makeHtml($scope.data.fields.bodyText)

// ])
	


