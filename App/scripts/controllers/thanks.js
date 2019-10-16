(function (module) {
	module.controller('ThanksCtrl',['$http','$locale','$scope', '$rootScope', '$location','$cookieStore',  'FunctionFactory', 'localStorageService',
    function ($http,$locale,$scope, $rootScope, $location, $cookieStore,FunctionFactory, localStorageService) {

    		$scope.NavigateProducts = function () {
				var scrollableContainer = $('html, body');
				scrollableContainer.animate({ scrollTop: '0px' }, '10', 'swing');
				$location.path('/');
			}


	}
])
}(angular.module('thanks', [])));
