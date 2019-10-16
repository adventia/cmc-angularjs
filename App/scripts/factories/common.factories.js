(function (module) {

	module.factory("FunctionFactory", ["localStorageService", "$http", "$q",  "$cookieStore", "$rootScope", 
		function (localStorageService, $http, $q, $cookieStore, $rootScope) {
		var factory = {};
		factory.getAllProducts = function () {
			var url = '//cmc-api.azurewebsites.net/api/products/';
			return $http.get(url);
		}

		factory.calculateShipping = function (centstotal) {
			var url = '//cmc-api.azurewebsites.net/api/products/shipping/' + centstotal;
			return $http.get(url);
		}



		factory.placeOrder = function (products) {
			return $http({
				method  : 'POST',
				url     : '//cmc-api.azurewebsites.net/api/products/placeorder/',
				data    : products,
				headers: { 'Accept' : 'applicatupion/json','Content-Type' : 'application/json'}
			});
		}


		return factory;
	}])

}(angular.module('common.factories', ['common.controllers'])));



