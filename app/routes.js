var Todo = require('./models/todo');
var User = require('./models/user');
var Tag = require('./models/tag');

var rand = require("generate-key");

var LINK_URL = 'http://localhost:8080/api/scan/';

function getUsers(res) {
    User.find(function(err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return all todos in JSON format
    });
};

function getTags(res) {
    Tag.find(function(err, tags) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(tags); // return all todos in JSON format
    });
};

function getTodos(res) {
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getUserByTag(res, key) {
    Tag.find({
        "key": key
    }, function(err, tags) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        console.log('user = ' + tags[0].user);

        User.find({
            "name": tags[0].user
        }, function(err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            res.json(users); // return all todos in JSON format
        });

        //res.json(tags); // return all todos in JSON format
    });
};

function getTagsByUser(res, user) {
    Tag.find({
        "user": user
    }, function(err, tags) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        //console.log('user = ' + tags[0].user);

        res.json(tags);
    });
};

module.exports = function(app) {

    app.get('/api/tags', function(req, res) {
        getTags(res);
    });

    app.get('/api/scan/:key', function(req, res) {
        res.send('Shalom ' + req.params.key + ' :)');
    });

    app.get('/api/scan1/:key', function(req, res) {
        getUserByTag(res, req.params.key);
    });

    app.get('/api/tags/:user', function(req, res) {
        getTagsByUser(res, req.params.user);
    });

    app.post('/api/tags', function(req, res) {

        var key = rand.generateKey();

        // create a todo, information comes from AJAX request from Angular
        Tag.create({
            key: key,
            user: 'Mantz1',
            desc: 'mama',
            link: LINK_URL + key,
            desc: 'mama',
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);
            getTags(res);
        });

    });

    app.get('/api/users', function(req, res) {
        getUsers(res);
    });

    app.post('/api/users', function(req, res) {

        var key = rand.generateKey();

        // create a todo, information comes from AJAX request from Angular
        User.create({
            name: 'Mantz',
            bday: '8-7-1990',
            phone: '0525871346',
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);
            getUsers(res);
        });

    });

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            koko: 'mama',
            done: false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
