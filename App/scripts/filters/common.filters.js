/**
 * Created by alanjames on 25/11/2014.
 */


(function (module) {
	module.filter('customCurrency', ["$filter", function ($filter) {
		return function (amount, currencySymbol) {

			var currency = $filter('currency');
			if (amount < 0) {
				return currency(amount, currencySymbol).replace("(", "-").replace(")", "");
			}
			return currency(amount, currencySymbol);
		};
	}]);


}(angular.module('common.filters', ['common.controllers'])));