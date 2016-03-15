angular.module('tagService', [])

// super simple service
// each function returns a promise object 
.factory('Tags', ['$http', function($http) {
    return {
        getbyuser: function(user) {
            return $http.get('/api/tags/' + user);
        },
        getbykey: function(key) {
            return $http.get('/api/tag/' + key);
        },
        getbykeyandloc: function(key, pos) {
            return $http.post('/api/tag/' + key, pos);
        },
        create: function(tagData) {
            return $http.post('/api/tags', tagData);
        },
        scan: function() {
            return $http.get('/api/scan/123');
        }
    }
}]);
