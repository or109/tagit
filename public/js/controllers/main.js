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

    $scope.loading = true;

    Users.get()
        .success(function(data) {
            $scope.users = data;
        });


    $scope.getAllTagsByUser = function(user) {
        $scope.loading = true;
        Tags.getbyuser(user)
            .success(function(data) {
                // console.log('fill tag by user - '+ user);
                $scope.tags = data;
                // console.log($scope.tags);
                $scope.loading = false;

                // put all tags in map
                deleteMarkers();
                $scope.tags.forEach(function(tag) {
                    tag.founds.forEach(function(found) {
                        if (found.pos && found.date) {
                            addMarker(tag.desc, found.date, found.pos.lat, found.pos.lng);
                        }
                    });
                });

            });
    };
}]);

myControllers.controller('foundController', function($scope, $http, $routeParams, Tags) {

    $scope.loading = true;
    $scope.key = $routeParams.key;
    $scope.msg = 'HOlaaa TOD MOTEK!!';
    $scope.pos = {};
    $scope.pos.lat = 0.0;
    $scope.pos.lng = 0.0;

    $scope.getTagByKey = function(key) {
        Tags.getbykey(key)
            .success(function(data) {
                $scope.tag = data;
                $scope.loading = false;
            });
    };

    $scope.getTagByKeyAndLoc = function(key) {
        var pos = {};

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                $scope.pos = pos;

                Tags.getbykeyandloc(key, pos)
                    .success(function(data) {
                        $scope.tag = data;
                        $scope.loading = false;
                    });

            }, function() {
                console.log("balagan - handleLocationError");
            });
        } else {
            // Browser doesn't support Geolocation
            console.log("balagan - handleLocationError");
        }
    };

    //$scope.getTagByKey($scope.key);
    $scope.getTagByKeyAndLoc($scope.key);

});
