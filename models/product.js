const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 10,
    },
});
module.exports = mongoose.model("Product", productSchema);

/* Pripojenie bez mongoose
const mongodb = require("mongodb");
const getDb = require("../util/db").db;

class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this._id = new mongodb.ObjectId();
    }
    save() {
        const db = getDb();
        db.collection("products")
            .insertOne(this)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static fetchAll() {
        const db = getDb();
        return db
            .collection("products")
            .find()
            .toArray()
            .then((products) => {
                return products;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
module.exports = Product;
*/
