const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

var flash = require("connect-flash");
const session = require("express-session");
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());

// const mongoConnect = require("./util/db").mongoConnect;// pripojenie bez mongoose
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "views");
app.set("view engine", "ejs");

const shopController = require("./controllers/shop"); //premenej shopController priradim shop.js v zlozke controllers

// // app.get("/", (req, res) => {
// //     res.send("HI!");
// // });

app.get("/", (req, res, next) => {
    shopController.getProducts(req, res, next);
});
app.get("/add", (req, res, next) => {
    shopController.getAddProduct(req, res, next);
});
app.post("/add", (req, res, next) => {
    shopController.postAddProduct(req, res, next);
});
app.post("/addcard", (req, res, next) => {
    shopController.getCreateOrder(req, res, next);
});
app.post("/createorder", (req, res, next) => {
    shopController.postCreateOrder(req, res, next);
});
app.get("/orders", (req, res, next) => {
    shopController.getOrders(req, res, next);
});
app.get("/deleteproduct/:productId", (req, res, next) => {
    shopController.deleteProduct(req, res, next);
});

/* Pripojenie bez mongoose
mongoConnect(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});
*/

mongoose
    .connect(
        "mongodb+srv://miso:aaaa@cluster0.6wwhh.mongodb.net/test?retryWrites=true&w=majority"
    )
    .then((result) => {
        app.listen(port);
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
