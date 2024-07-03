const Product = require('../models/productModel');


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("con ",products)
        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = Product.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.addProduct = (req, res) => {
    const newProduct = req.body;
    Product.addProduct(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const updatedProduct = req.body;
    Product.updateProduct(updatedProduct);
    res.json(updatedProduct);
};

exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    Product.deleteProduct(id);
    res.status(204).end();
};
