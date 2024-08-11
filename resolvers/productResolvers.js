// src/resolvers/productResolvers.js
const Product = require('../models/productModel');

const productResolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (parent, args) => await Product.findById(args.id),
  },
  Mutation: {
    addProduct: async (parent, args) => {
      const product = new Product(args);
      return await product.save();
    },
    deleteProduct: async (parent, args) => {
      const product = await Product.findByIdAndDelete(args.id);
      return product;
    },
    updateProduct: async (parent, args) => {
      const product = await Product.findByIdAndUpdate(
        args.id,
        { $set: args },
        { new: true }
      );
      return product;
    },
  },
};

module.exports = productResolvers;
