/*
* @Author: Ryan Choi
* @Date:   2018-04-09 17:26:18
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-10 15:44:46
*/
const MongoClient = require('mongodb').MongoClient;
const Hapi = require('hapi');

const url = 'mongodb://localhost:27017/CompleteSentence';
const server = new Hapi.Server({ port: 3000, host: 'localhost' });

// const findDocuments = (database, callback) => {
//     const db = database.db("CompleteSentence");
//     const collection = db.collection('quotes');

//     collection.find({"author":"Winston Churchill"}).toArray((err, docs) => {
//         console.log(docs);
//         callback;
//     });
// };

server.route( [
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        handler: (request, reply) => {
            collection.find().toArray((error, tours) => {
                reply(tours);
            })
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: (request, reply) => {
            reply ("Adding new tour");
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            reply ("Retrieving " + request.params.name);
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            // request.payload variables
            reply ("Updating " + request.params.name);
        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: (request, reply) => {
            reply ("Deleting " + request.params.name).code(204);
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply( "Hello world from Hapi/Mongo example.")
        }
    }
])

MongoClient.connect(url, (err, database) => {
    console.log("connected correctly to server");

    const db = database.db("CompleteSentence");
    const collection = db.collection('quotes');
    server.start((err) => {
        console.log('Hapi is listening to http://localhost:8080')
    });

});