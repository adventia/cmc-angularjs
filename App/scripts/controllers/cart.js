(function (module) {
	module.controller('CartCtrl',['$http','$locale','$scope', '$rootScope', '$location','$cookieStore',  'FunctionFactory', 'localStorageService',
    function ($http,$locale,$scope, $rootScope, $location, $cookieStore,FunctionFactory, localStorageService) {

    	$scope.cart = localStorageService.get('cart');

    	if ($scope.cart === null)
    	{
    		$scope.cart = {};
    		$scope.cart.items = [];
    	}
    	$scope.carttotal = 0.00;


		$scope.CalculateShipping = function() {
    		const centstotal = parseInt($scope.carttotal * 100);
			FunctionFactory.calculateShipping(centstotal).then(
				function (response) {
					const shippingtotalcents = parseInt(response.data);
					$scope.shippingtotal = shippingtotalcents / 100;
					$scope.total = (centstotal + shippingtotalcents) / 100
				},
					function (response) {
						alert('error in API call');
				}
			);
		};

		$scope.PlaceOrder = function() {
			FunctionFactory.placeOrder($scope.cart.items).then(
				function (response) {
			    	localStorageService.set('cart', null);
					$scope.NavigateThanks();
				},
					function (response) {
						alert('error in API call');
				}
			);
		};

    	$scope.CalculateTotals = function () {
    		$scope.carttotal = 0.00;
    		angular.forEach($scope.cart.items, function (value, key) {
    		 	$scope.carttotal += value.price;
            });
   		 	$scope.CalculateShipping();
    	}
    	$scope.CalculateTotals();




    	$scope.NavigateProducts = function () {
			var scrollableContainer = $('html, body');
			scrollableContainer.animate({ scrollTop: '0px' }, '10', 'swing');
			$location.path('/');
		}

		$scope.NavigateThanks = function () {
			var scrollableContainer = $('html, body');
			scrollableContainer.animate({ scrollTop: '0px' }, '10', 'swing');
			$location.path('/thanks');
		}


		$scope.RemoveItem = function (index)
		{
			$scope.cart.items.splice(index, 1);
			localStorageService.set('cart', $scope.cart);
			$scope.CalculateTotals();
		}

	}
])
}(angular.module('cart', [])));
