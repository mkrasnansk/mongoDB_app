const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customername: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        require: true,
    },
    sum: {
        type: Number,
        require: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
});
module.exports = mongoose.model("Order", orderSchema);

/* Pripojenie bez mongoose
const mongodb = require("mongodb");
const getDb = require("../util/db").db;

class Order {
    constructor(customername, address, productId, qty, price) {
        this.customername = customername;
        this.address = address;
        this.qty = qty;
        this.sum = qty * price + "€";
        this._id = new mongodb.ObjectId();
        this.productId = new mongodb.ObjectId(productId);
    }
    save() {
        const db = getDb();
        db.collection("orders")
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
            .collection("orders")
            .aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "product",
                    },
                },
            ])
            .toArray();
    }
}
module.exports = Order;
*/
