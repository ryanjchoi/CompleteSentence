/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-20 07:21:16
*/

var MongoClient = require('mongodb').MongoClient;
var Hapi = require('hapi');

var url = 'mongodb://localhost:27017/learning_mongo'

const server = Hapi.server({
    host: 'localhost',
    port: 8080,
});

server.route( [
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        handler: function(request, reply) {
            collection.find().toArray((error, tours) => {
                reply(tours);
            })
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: function(request, reply) {
            reply ("Adding new tour");
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            reply ("Retrieving " + request.params.name);
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            // request.payload variables
            reply ("Updating " + request.params.name);
        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, reply) {
            reply ("Deleting " + request.params.name).code(204);
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply( "Hello world from Hapi/Mongo example.")
        }
    }
])

var findDocuments = function(database, callback) {
    const db = database.db("learning_mongo");
    collection = db.collection('tours');

    collection.find().toArray(function(err, docs) {
        console.log(docs);
        callback;
    })
}

MongoClient.connect(url, function(err, database) {
    console.log("connected correctly to server");

    findDocuments(database, function () {
        database.close();
    });

    // server.start(function(err) {
    //     console.log('Hapi is listening to http://localhost:8080')
    // })
})
