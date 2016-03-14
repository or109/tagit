var User = require('./models/user');
var Tag = require('./models/tag');

var rand = require("generate-key");

//var HOST = 'https://tagit-or109.c9users.io';
var HOST = 'http://192.168.1.106:8080';
var LINK_URL = HOST + '/#/found/';

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

function updateTagByKey(key) {
    console.log('updateTagByKey(key) -' + key);

    Tag.find({
        "key": key
    }, function(err, tags) {

        console.log(tags);
        var arr = tags[0].founds;
        arr.push(new Date());

        Tag.update({ 'key': key }, { 'founds': arr }, function(error, result) {
            console.dir(result);
        });
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

function getTagByKey(res, key) {
    Tag.find({
        "key": key
    }, function(err, tag) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(tag);
    });
};

module.exports = function(app) {

    // TAGS
    // 
    // 
    app.get('/api/tags', function(req, res) {
        getTags(res);
    });

    app.get('/api/scan/:key', function(req, res) {
        //res.send('Shalom ' + req.params.key + ' :)');
        console.log(__dirname + '/found.html');
        res.sendFile(__dirname + '/found.html');
    });

    ///################### TRY IT!!
    app.post('/api/tag/:key', function(req, res) {
        updateTagByKey(req.params.key);
        getUserByTag(res, req.params.key);
    });
    ///################### TRY IT!!

    app.get('/api/scan1/:key', function(req, res) {
        getUserByTag(res, req.params.key);
    });

    app.get('/api/tags/:user', function(req, res) {
        getTagsByUser(res, req.params.user);
    });

    app.get('/api/tag/:key', function(req, res) {
        getTagByKey(res, req.params.key);

        // you need to report it !!!
        updateTagByKey(req.params.key);
    });

    app.post('/api/tags', function(req, res) {

        var key = rand.generateKey();

        // create a todo, information comes from AJAX request from Angular
        Tag.create({
            key: key,
            user: 'Mantz2',
            desc: 'mama',
            link: LINK_URL + key,
            desc: 'My muchila',
            msg: 'Give me this back PLEASE PLEASE PLEASE!! call me - 052578446',
            done: false
        }, function(err, data) {
            if (err)
                res.send(err);
            getTags(res);
        });

    });

    // USERS
    // 
    // 
    app.get('/api/users', function(req, res) {
        getUsers(res);
    });

    app.post('/api/users', function(req, res) {

        var key = rand.generateKey();

        // create a todo, information comes from AJAX request from Angular
        User.create({
            name: 'Mantz2',
            bday: '8-7-1990',
            phone: '0525871346',
            done: false
        }, function(err, data) {
            if (err)
                res.send(err);
            getUsers(res);
        });

    });


    // application -------------------------------------------------------------
    /* app.get('*', function(req, res) {
         console.log(__dirname + '/public/index.html');
         res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
     });*/
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });
};
