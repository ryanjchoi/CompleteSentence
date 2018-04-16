/*
* @Author: Ryan Choi
* @Date:   2018-04-15 20:48:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-15 20:51:09
*/

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/CompleteSentence';

MongoClient.connect(url, function(err, db) {
    console.log("Connected successfully to server");

    db.close();
});
