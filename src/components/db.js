/*
* @Author: Ryan Choi
* @Date:   2018-04-09 17:26:18
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-10 13:37:16
*/
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/CompleteSentence';

const findDocuments = function(database, callback) {
    const db = database.db("CompleteSentence");
    const collection = db.collection('quotes');

    collection.find({"author":"Winston Churchill"}).toArray(function(err, docs) {
        console.log(docs);
        callback;
    });
};

MongoClient.connect(url, function(err, database) {
    console.log("Connected successfully to server");

    findDocuments(database, function () {
        database.close();
    });

});