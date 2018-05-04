/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-03 06:32:24
*/

var Hapi = require('hapi');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CompleteSentence');
var db = mongoose.connection;

var quoteSchema = mongoose.Schema({
    author: String,
    sentence: String
});

var Task = mongoose.model('quotes', quoteSchema)

var server = new Hapi.Server();
server.connection({ port: 3000 });

const LIMIT = 50;

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Welcome to CompleteSentence API. Please visit http://www.CompleteSentence.com/api for detail information.');
        }
    },

    // Get ToDo List
    {
        method: 'GET',
        path: '/api/v1/quotes',
        handler: function(request, reply) {
            var result = Task.find().limit(LIMIT);
            result.exec(function(err, tasks) {
                reply(tasks);
            })
        }
    },

    // Get quotes by id
    {
        method: 'GET',
        path: '/api/v1/quotes/id/{id}',
        handler: function(request, reply) {
            var id = request.params.id;
            var result = Task.findOne({
                '_id': id
            });
            result.exec(function(err, quote) {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            })
        }
    },

    // Get quotes by author
    {
        method: 'GET',
        path: '/api/v1/quotes/author/{author}',
        handler: function(request, reply) {
            var author = request.params.author;
            if (author.length < 3) {
                //TODO: add some logic here
            }
            var result = Task.find({
                'author': {$regex: new RegExp(author)}
            }).sort({'author': 1}).limit(LIMIT);
            result.exec(function(err, quote) {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            })
        }
    },

    // Get quotes by keyword
    {
        method: 'GET',
        path: '/api/v1/quotes/sentence/{keyword}',
        handler: function(request, reply) {
            var keyword = request.params.keyword;
            if(keyword.length < 3) {
                //TODO: add some logic here
            }
            var result = Task.find({
                'sentence': {$regex: new RegExp(keyword)}
            }).limit(LIMIT);
            result.exec(function(err, quote) {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            })
        }
    },

    {
        method: 'POST',
        path: '/api/v1/quotes',
        handler: function(request, reply) {
            var newTask = new Task({
                'author': request.payload.author,
                'sentence': request.payload.sentence
            });
            newTask.save(function(err, newTask) {
                reply(newTask).code(201)
            })
        }
    },

    // Update single sentence by id
    {
        method: 'PUT',
        path: '/api/v1/quotes/id/{id}',
        handler: function(request, reply) {
            var updateData = {
                'sentence': request.payload.sentence,
                'author': request.params.author
            }
            Task.findOneAndUpdate(
                {'_id': request.params.id},
                updateData,
                {new:true},
                function(err, doc) {
                    reply(doc);
                }
            )
        }
    },

    // Delete single sentence by id
    {
        method: 'DELETE',
        path: '/api/v1/quotes/id/{id}',
        handler: function(request, reply) {
            Task.findOneAndRemove(
            {'_id': request.params.id},
            function(err, response) {
                reply().code(204);
            });
        }
    }
]);

server.start(function(err) {
    console.log('Hapi is listening to http://localhost:3000');
});

