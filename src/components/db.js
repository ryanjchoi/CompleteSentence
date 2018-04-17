/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-17 06:42:19
*/

var MongoClient = require('mongodb').MongoClient,
    Hapi = require('hapi');

var url = 'mongodb://localhost:27017/CompleteSentence'

var findDocuments = function(database, callback) {
    const db = database.db("CompleteSentence");
    collection = db.collection('quotes');

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
})
