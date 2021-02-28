/*
///////////////pripojenie mongoDB
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoUri =
    "mongodb+srv://miso:aaaa@cluster0.6wwhh.mongodb.net/test?retryWrites=true&w=majority";

    let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(mongoUri)
        .then((client) => {
            console.log("connected !!!");
            _db = client.db("test");
            callback(client);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};
////////////////
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No db found";
};
exports.mongoConnect = mongoConnect;
exports.db = getDb;
*/
