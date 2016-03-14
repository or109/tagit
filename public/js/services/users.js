angular.module('userService', [])

// super simple service
// each function returns a promise object 
.factory('Users', ['$http', function($http) {
    return {
        get: function(user) {
            return $http.get('/api/users');
        },
        create: function(tagData) {
            return $http.post('/api/tags', tagData);
        },
        scan: function() {
            return $http.get('/api/scan/123');
        }
    }
}]);
