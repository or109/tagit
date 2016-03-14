// create a module for the controllers
var myControllers = angular.module('appController', [])

// inject the Todo service factory into our controller
myControllers.controller('mainController', ['$scope', '$http', 'Tags', 'Users', function($scope, $http, Tags, Users) {
    $scope.formData = {};
    $scope.loading = true;

    $scope.qrcodeString = 'ENTER YOUR qrcodeString HERE';
    $scope.size = 150;
    $scope.correctionLevel = '';
    $scope.typeNumber = 0;
    $scope.inputMode = '';


    Users.get()
        .success(function(data) {
            $scope.users = data;
        });


    $scope.getAllTagsByUser = function(user) {
        Tags.getbyuser(user)
            .success(function(data) {
                // console.log('fill tag by user - '+ user);
                $scope.tags = data;
                // console.log($scope.tags);
                $scope.loading = false;
            });
    };

}]);

myControllers.controller('foundController', function($scope, $http, $routeParams, Tags) {
    console.log('ma kore !!' + $routeParams.key);

    $scope.key = $routeParams.key;
    $scope.msg = 'HOlaaa TOD MOTEK!!';

    $scope.getTagByKey = function(key) {
        Tags.getbykey(key)
            .success(function(data) {
                $scope.tag = data;
                $scope.loading = false;
            });
    };

    $scope.getTagByKey($scope.key);
});
