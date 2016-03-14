angular.module('tagService', [])

// super simple service
// each function returns a promise object 
.factory('Tags', ['$http', function($http) {
    return {
        get: function(user) {
            return $http.get('/api/tags/' + user);
        },
        create: function(tagData) {
            return $http.post('/api/tags', tagData);
        },
        scan: function() {
            return $http.get('/api/scan/123');
        }
    }
}]);
