// create a module for the controllers
var myControllers = angular.module('todoController', [])

// inject the Todo service factory into our controller
myControllers.controller('mainController', ['$scope', '$http', 'Todos', 'Tags', 'Users', function($scope, $http, Todos, Tags, Users) {
    $scope.formData = {};
    $scope.loading = true;


    $scope.qrcodeString = 'ENTER YOUR LOG HERE';
    $scope.size = 150;
    $scope.correctionLevel = '';
    $scope.typeNumber = 0;
    $scope.inputMode = '';


    Users.get()
        .success(function(data) {
            $scope.users = data;
        });

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
        .success(function(data) {
            $scope.todos = data;
            $scope.loading = false;
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

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            // call the create function from our service (returns a promise object)
            Todos.create($scope.formData)

            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.loading = false;
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; // assign our new list of todos
            });
        }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $scope.loading = true;

        Todos.delete(id)
            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.loading = false;
                $scope.todos = data; // assign our new list of todos
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
