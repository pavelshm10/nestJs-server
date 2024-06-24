const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    const products = productModel.getAllProducts();
    console.log({products})
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.json(products);
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = productModel.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.addProduct = (req, res) => {
    const newProduct = req.body;
    productModel.addProduct(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const updatedProduct = req.body;
    productModel.updateProduct(updatedProduct);
    res.json(updatedProduct);
};

exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    productModel.deleteProduct(id);
    res.status(204).end();
};
