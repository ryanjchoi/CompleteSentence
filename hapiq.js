var Hapi = require('hapi');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CompleteSentence');
var db = mongoose.connection;

var taskSchema = mongoose.Schema({
    author: String,
    sentence: String
});

var Task = mongoose.model('quotes', taskSchema)

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply('Hello world from hapi');
        }
    },

    // Get ToDo List
    {
        method: 'GET',
        path: '/api/v1/todolist',
        handler: function(request, reply) {
            var result = Task.find().limit(3);
            result.exec(function(err, tasks) {
                reply(tasks);
            })
        }
    },

    // Get single quote
    {
        method: 'GET',
        path: '/api/v1/todolist/{author}',
        handler: function(request, reply) {
            var result = Task.findOne({"author":request.params.author});
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
        path: '/api/v1/todolist',
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

    // Update single sentence
    {
        method: 'PUT',
        path: '/api/v1/todolist/{author}',
        handler: function(request, reply) {
            var updateData = {
                'sentence': request.payload.sentence,
                'author': request.params.author
            }
            Task.findOneAndUpdate(
                {'author': request.params.author},
                updateData,
                {new:true},
                function(err, doc) {
                    reply(doc);
                }
            )
        }
    },

    {
        method: 'DELETE',
        path: '/api/v1/todolist/{author}',
        handler: function(request, reply) {
            Task.findOneAndRemove(
            {author:request.params.author},
            function(err, response) {
                reply().code(204);
            });
        }
    }
]);

server.start(function(err) {
    console.log('Hapi is listening to http://localhost:3000');
});
