(function () {
    'use strict';

    angular
        .module('cmc', [
            'LocalStorageModule',
            'ui.bootstrap',
            'ui.bootstrap.tpls',
            'landing',
            'cart',
            'thanks',
            'siteheader.directive',
            'ngRoute',
            'common.controllers',
            'common.filters',
            'common.directives',
            'common.factories',
            'ngCookies'])
        .config(config)
        .run(run);
    config.$inject = ['$httpProvider', '$routeProvider', '$locationProvider'];

    function config($httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'LandingCtrl',
                templateUrl: 'views/landing.html',
            })
             .when('/cart', {
                controller: 'CartCtrl',
                templateUrl: 'views/cart.html',
            })
             .when('/thanks', {
                controller: 'ThanksCtrl',
                templateUrl: 'views/thanks.html',
            })

            .otherwise({ redirectTo: '/' });
    }


    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$window'];

    function run($rootScope, $location, $cookieStore, $http, $window) {
    }
})();