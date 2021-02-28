const Order = require("../models/order");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    let error = req.flash("error");
    res.render("addproduct", {
        path: "/",
        errorMessage: error,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: parseInt(req.body.price),
    });
    try {
        let result = await product.save();
        res.redirect("/");
    } catch (err) {
        console.log(err.message);
        req.flash("error", err.message);
        res.redirect("/add");
    }
};
exports.getProducts = (req, res, next) => {
    Product.find().then((products) => {
        console.log(products);
        res.render("shop", {
            products: products,
            path: "/",
        });
    });
};
exports.getCreateOrder = (req, res, next) => {
    res.render("createorder", {
        path: "/",
        qty: req.body.qty,
        price: req.body.price,
        productId: req.body.productId,
    });
};
exports.postCreateOrder = (req, res, next) => {
    const order = new Order({
        customername: req.body.customername,
        address: req.body.address,
        productId: req.body.productId,
        qty: parseInt(req.body.qty),
        sum: parseInt(req.body.price) * parseInt(req.body.qty),
    });
    order.save();
    res.redirect("/");
};
exports.getOrders = (req, res, next) => {
    Order.find()
        .populate("productId")
        .then((orders) => {
            res.render("orders", {
                orders: orders,
                path: "/",
            });
        });
};
exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId).then((result) => {
        res.redirect("/");
    });
};
