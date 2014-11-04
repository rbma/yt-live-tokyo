
/*global Showdown:false */
/*global moment:false */

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
		'youtube',
		'contentfulClient',
		function ($scope, $rootScope, $sce, twitter, youtube, contentfulClient) {

			var converter = new Showdown.converter();
			var pageId = '6dfDQTqL16Q48mMo0kYwYs'; //page id
			var defaultVideo = 'zVXnoIoWu88'; //stock video and/or livestream
			var streamVideo = ''; //live stream vid
			var timer;

			//kick off timer
			$rootScope.$broadcast('timer-start');

			//flags and globals
			$scope.tweets = '';
			$scope.ready = false;
			$scope.video = {};
			$scope.video.playing = false;
			$scope.video.ready = false;
			$scope.player = {};
			$scope.nextBroadcast = '';
			$scope.mobileStream = '';
			$scope.releaseDate = '';
			$scope.dataReady = false;

	
			

			//TWITTER
			twitter.init().success(function(data){
				
				var tweets = data;
				var length = tweets.length;

				for(var i = 0; i < length; i++){
					$scope.tweets = $scope.tweets + '@' + tweets[i].username + ': ' + tweets[i].tweet + ' ';
				}

				$scope.ready = true;

			}); //end twitter




			//listen for youtube ready event and grab a reference to player
			$rootScope.$on('videoOn', function(event, data){
				//event is purely angular callback
				$scope.player = data;
			});



			$scope.trust = function(text){
				return $sce.trustAsHtml(text);
			};

			$scope.swapVideo = function(id){
				$scope.player.loadVideoById(id);
				//make sure we have sound
				$scope.player.unMute();
				$scope.video.playing = true;
			};

			$scope.closeVideo = function(){
				$scope.player.mute();
				$scope.player.loadVideoById(defaultVideo);
				$scope.video.playing = false;

			};




			var keepChecking = function(){
				//episode not out yet, playing default stream
				if (moment() < $scope.releaseDate){
					$scope.video.ready = false;
				}

				//episode out, play real stream
				if (moment() >= $scope.releaseDate){
					$scope.video.ready = true;
					$scope.video.playing = true;
					clearInterval(timer);
					$scope.player.loadVideoById(streamVideo);
				}
			};


			//checks to see if video is now updating
			var checkTime = function(){

				//episode not out yet, playing default stream
				if (moment() < $scope.releaseDate){
					$scope.video.ready = false;
					youtube.init(defaultVideo);
					timer = setInterval(keepChecking, 10000);
				}

				//episode out, play real stream
				if (moment() >= $scope.releaseDate){
					$scope.video.ready = true;
					$scope.video.playing = true;
					youtube.init(streamVideo);
				}
				
			};


			//get data
			contentfulClient.entries({'sys.id': pageId, 'include': 10}).then(function(data){

				$scope.data = data[0];

				console.log($scope.data);

				//get reference to streaming vid
				streamVideo = $scope.data.fields.youtubeStreamId;

				$scope.mobileStream = '//www.youtube.com/embed/' + streamVideo;

				//send message that data is ready
				$rootScope.$broadcast('data');

				$scope.dataReady = true;


				//convert date
				$scope.releaseDate = new Date($scope.data.fields.broadcastTime);
				$scope.nextBroadcast = moment($scope.releaseDate).format('llll');

				//episode is not released yet
				checkTime();
				
				//render html from markdown
				$scope.lineup = converter.makeHtml($scope.data.fields.performers);
				$scope.body = converter.makeHtml($scope.data.fields.bodyText);

			}); //end data
		}
	]
);

