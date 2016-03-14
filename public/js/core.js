var myApp = angular.module('scotchTodo', ['ngRoute', 'todoController', 'todoService', 'tagService', 'userService', 'ja.qr']);

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
