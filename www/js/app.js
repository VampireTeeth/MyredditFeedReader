// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myreddit', ['ionic', 'angularMoment']).controller('MyredditCtrl',
  function($scope, $http){

    $scope.stories = [];

    function loadStories(params, callback) {
      $http.get('https://www.reddit.com/r/Android/new/.json', {params: params}).success(
        function(response){
          var stories = [];
          angular.forEach(response.data.children, function(child){
            stories.push(child.data);
          });
          //console.log(stories);
          callback(stories);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      );
    }

    $scope.loadOlderStories = function () {
      var params = {};
      if ($scope.stories.length > 0) {
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      loadStories(params, function(stories){
        $scope.stories = $scope.stories.concat(stories);
      });
    };

    $scope.loadNewerStories = function () {
      loadStories({'before': $scope.stories[0].name}, function(stories){
        $scope.stories = stories.concat($scope.stories);
      });
    };

  }
).run(
  function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
});
