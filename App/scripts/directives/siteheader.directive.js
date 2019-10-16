(function (module) {
	module.directive('siteHeader', ['$rootScope', 'localStorageService',
		function($rootScope, localStorageService) {
			return{
					restrict : 'E',
					scope : { entity : '='},
					templateUrl : '/views/_partials/siteheader.directive.html',
					controller: (['$scope', function ($scope)  {




					}]),
					link : function(scope, element, attrs) {
					}
			};
	}]);
}(angular.module('siteheader.directive', [])));

