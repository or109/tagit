var myApp = angular.module('tagitApp', ['ngRoute', 'appController', 'tagService', 'userService', 'ja.qr']);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        }).
        when('/found/:key', {
            templateUrl: 'found.html',
            controller: 'foundController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
