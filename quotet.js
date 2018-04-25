var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    Hapi = require('hapi');

var url = 'mongodb://localhost:27017/CompleteSentence'

var server = new Hapi.Server();
server.connection({
    port:3000
})

server.route( [
    // Get quote list
    {
        method: 'GET',
        path: '/api/quotes',
        config: {json: {space: 2}},
        handler: function(request, reply) {
            var findObject = {};
            for (var key in request.query) {
                findObject[key] = request.query[key]
            }
            collection.find(findObject).toArray(function(error, quotes) {
                assert.equal(null,error);
                reply(quotes);
            })
        }
    },
    // Add new quote
    {
        method: 'POST',
        path: '/api/quotes',
        handler: function(request, reply) {
            reply ("Adding new quote");
        }
    },
    // Get a single quote
    {
        method: 'GET',
        path: '/api/quotes/{author}',
        config: {json: {space: 2}},
        handler: function(request, reply) {
            collection.findOne({"author":request.params.author}, function(error, quote) {
               assert.equal(null,error);
               reply(quote);
            })
        }
    },
    // Update a single quote
    {
        method: 'PUT',
        path: '/api/quotes/{author}',
        handler: function(request, reply) {
            // request.payload variables
            reply ("Updating " + request.params.author);
        }
    },
    // Delete a single quote
    {
        method: 'DELETE',
        path: '/api/quotes/{author}',
        handler: function(request, reply) {
            reply ("Deleting " + request.params.author).code(204);
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

MongoClient.connect(url, function(err, db) {
    assert.equal(null,err);
    console.log("connected correctly to server");
    collection = db.collection('quotes');
    server.start(function(err) {
        console.log('Hapi is listening to http://localhost:3000')
    })
})