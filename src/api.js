/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-06-16 16:05:12
*/

const Hapi = require('hapi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CompleteSentence');
// const db = mongoose.connection;

// QuoteTask
const quoteSchema = mongoose.Schema({
    author: String,
    sentence: String
});
const QuoteTask = mongoose.model('quotes', quoteSchema);

// VoteTask
const voteSchema = mongoose.Schema({
    quoteId: String,
    userId: String
});
const VoteTask = mongoose.model('vote', voteSchema);


const server = new Hapi.Server();
server.connection({ port: 3000 });

const LIMIT = 50;

server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('Welcome to CompleteSentence API. Please visit http://www.CompleteSentence.com/api for detail information.');
        }
    },

    // Get ToDo List
    {
        method: 'GET',
        path: '/api/v1/quotes',
        handler: (request, reply) => {
            const result = QuoteTask.find().limit(LIMIT);
            result.exec((err, tasks) => {
                reply(tasks);
            });
        }
    },

    // Get quotes by id
    {
        method: 'GET',
        path: '/api/v1/quotes/id/{id}',
        handler: (request, reply) => {
            const id = request.params.id;
            const result = QuoteTask.findOne({
                _id: id
            });
            result.exec((err, quote) => {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            });
        }
    },

    // Get vote count by id
    {
        method: 'GET',
        path: '/api/v1/vote/id/{id}',
        handler: (request, reply) => {
            const id = request.params.id;
            const result = VoteTask.find({
                _id: id
            }).count();
            result.exec((err, quote) => {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            });
        }
    },

    // Get quotes by author
    {
        method: 'GET',
        path: '/api/v1/quotes/author/{author}',
        handler: (request, reply) => {
            const author = request.params.author;
            if (author.length < 3) {
                //TODO: add some logic here
            }
            const result = QuoteTask.find({
                author: { $regex: new RegExp(author) }
            }).sort({ author: 1 }).limit(LIMIT);
            result.exec((err, quote) => {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            });
        }
    },

    // Get quotes by keyword
    {
        method: 'GET',
        path: '/api/v1/quotes/sentence/{keyword}',
        handler: (request, reply) => {
            const keyword = request.params.keyword;
            if (keyword.length < 3) {
                //TODO: add some logic here
            }
            const result = QuoteTask.find({
                sentence: { $regex: new RegExp(keyword) }
            }).limit(LIMIT);
            result.exec((err, quote) => {
                if (quote) {
                    reply(quote);
                } else {
                    reply().code(404);
                }
            });
        }
    },

    {
        method: 'POST',
        path: '/api/v1/quotes',
        handler: (request, reply) => {
            const newQuoteTask = new QuoteTask({
                author: request.payload.author,
                sentence: request.payload.sentence
            });
            newQuoteTask.save((err, task) => {
                reply(task).code(201);
            });
        }
    },

    // Update single sentence by id
    {
        method: 'PUT',
        path: '/api/v1/quotes/id/{id}',
        handler: (request, reply) => {
            const updateData = {
                sentence: request.payload.sentence,
                author: request.params.author
            };
            QuoteTask.findOneAndUpdate(
                { _id: request.params.id },
                updateData,
                { new: true },
                (err, doc) => {
                    reply(doc);
                }
            );
        }
    },

    // Delete single sentence by id
    {
        method: 'DELETE',
        path: '/api/v1/quotes/id/{id}',
        handler: (request, reply) => {
            QuoteTask.findOneAndRemove(
            { _id: request.params.id },
            (err, response) => {
                reply().code(204);
            });
        }
    }
]);

server.start((err) => {
    console.log('Hapi is listening to http://localhost:3000');
});

