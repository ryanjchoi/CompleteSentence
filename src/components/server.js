/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-20 07:18:38
*/

var MongoClient = require('mongodb').MongoClient;
var Hapi = require('hapi');

var url = 'mongodb://localhost:27017/learning_mongo'

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

server.route( [
    {
        method: 'GET',
        path: '/',
        handler: function(request, h) {
            return "Hello, wordl!";
        }
    },

    {
        method: 'GET',
        path: '/{name}',
        handler: function(request, h) {
            return "Hello, " + encodeURIComponent(request.params.name) + "!";
        }
    },

    // // Add new tour
    // {
    //     method: 'POST',
    //     path: '/api/tours',
    //     handler: function(request, reply) {
    //         reply ("Adding new tour");
    //     }
    // },
    // // Get a single tour
    // {
    //     method: 'GET',
    //     path: '/api/tours/{name}',
    //     handler: function(request, reply) {
    //         reply ("Retrieving " + request.params.name);
    //     }
    // },
    // // Update a single tour
    // {
    //     method: 'PUT',
    //     path: '/api/tours/{name}',
    //     handler: function(request, reply) {
    //         // request.payload variables
    //         reply ("Updating " + request.params.name);
    //     }
    // },
    // // Delete a single tour
    // {
    //     method: 'DELETE',
    //     path: '/api/tours/{name}',
    //     handler: function(request, reply) {
    //         reply ("Deleting " + request.params.name).code(204);
    //     }
    // },
    // // Home page
    // {
    //     method: 'GET',
    //     path: '/',
    //     handler: function(request, reply) {
    //         reply( "Hello world from Hapi/Mongo example.")
    //     }
    // }
]);

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.url}`);
}

process.on("unhandleRejection", (err) => {

    console.log(err);
    process.exit();
});

init();



MongoClient.connect(url, function(err, database) {
    console.log("connected correctly to server");

    const db = database.db("learning_mongo");
    collection = db.collection('tours');

    server.start(function(err) {
        console.log('Hapi is listening to http://localhost:8080')
    })
})
