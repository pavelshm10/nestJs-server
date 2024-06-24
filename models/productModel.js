const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

function readProducts() {
    const data = fs.readFileSync(filePath);
    console.log("data check ",data);
    return JSON.parse(data);
}

function writeProducts(products) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

exports.getAllProducts = () => {
    return readProducts();
};

exports.getProductById = (id) => {
    const products = readProducts();
    return products.find(product => product.id === id);
};

exports.addProduct = (newProduct) => {
    const products = readProducts();
    products.push(newProduct);
    writeProducts(products);
};

exports.updateProduct = (updatedProduct) => {
    let products = readProducts();
    products = products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
    );
    writeProducts(products);
};

exports.deleteProduct = (id) => {
    let products = readProducts();
    products = products.filter(product => product.id !== id);
    writeProducts(products);
};
