(function (module) {
	module.controller('LandingCtrl',['$http','$locale','$scope', '$rootScope', '$location','$cookieStore',  'FunctionFactory', 'localStorageService',
    function ($http,$locale,$scope, $rootScope, $location, $cookieStore,FunctionFactory, localStorageService) {

    	$scope.cart = localStorageService.get('cart');

    	if ($scope.cart === null)
    	{
    		$scope.cart = {};
    		$scope.cart.items = [];
    	}

		$scope.GetAllProducts = function() {
			FunctionFactory.getAllProducts().then(
				function (response) {
					$scope.products = response.data;

				},
					function (response) {
						alert('error in API call');
				}
			);
		};
		$scope.GetAllProducts();

		$scope.NavigateCart = function () {
			var scrollableContainer = $('html, body');
			scrollableContainer.animate({ scrollTop: '0px' }, '10', 'swing');
			$location.path('/cart');
		}

		$scope.AddToCart = function (product) {
			$scope.cart.items.push(product);
	    	localStorageService.set('cart', $scope.cart);

		}

	}
])
}(angular.module('landing', [])));
