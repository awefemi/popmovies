'use strict';

var moviesApp = angular.module('moviesApp', ['ngRoute']);


angular.
  module('moviesApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          templateUrl : "movies-list.html"
        }).
        when('/view-movie/:movieId', {
          templateUrl: 'view-movie.html'
        }).
        otherwise('/');
    }
  ]);


moviesApp.controller('listController', function listController($scope,$http,$filter,$location,$rootScope,$sce) {
	
	 $rootScope.header=$sce.trustAsHtml("Pop Movies");
	 
	 $http.get(popularMovie+apiKey).then(function(response) {
        console.log(response.data);	
		$scope.popularMovies=response.data.results;
     });
	 
	 
	 $http.get(topRatedMovie+apiKey).then(function(response){
		$scope.topRatedMovies=response.data.results;
     });
	 
	 $scope.openMovie=function(id){	
		$location.path( "/view-movie/"+id );	 
	 };
	 
	 
	
});



moviesApp.controller('viewController', function viewController($scope,$http,$filter,$location,$routeParams,$rootScope,$sce){
	
	$rootScope.header=$sce.trustAsHtml("<a href='#!/'><i class='fa fa-arrow-left arrow-left'></i></a> MovieDetail");
	
	$http.get(popularMovie+apiKey).then(function(response) {

		 var found = $filter('filter')(response.data.results, {id:parseInt($routeParams.movieId)}, true);
		 console.log(found)
 
		  if (found.length) {			 
		  		$scope.movie=found[0];
				var releaseDate = new Date($scope.movie.release_date);
				$scope.movie.release_year=releaseDate.getFullYear();
		  }else{
				$http.get(topRatedMovie+apiKey).then(function(response){
					var found = $filter('filter')(response.data.results, {id: parseInt($routeParams.movieId)}, true);
					console.log(found)
					if (found.length) {
						$scope.movie=found[0];
						var releaseDate = new Date($scope.movie.release_date);
						$scope.movie.release_year=releaseDate.getFullYear();
					}
				}); 		
			}
			  
			
			
			  
    });	 
	 
	
	
	
	
	
	
	
	
	
	
});

