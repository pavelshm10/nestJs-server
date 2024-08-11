// src/typeDefs/productTypeDefs.js
const { gql } = require('apollo-server');

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String!, price: Float!): Product
    deleteProduct(id: ID!): Product
    updateProduct(id: ID!, name: String, description: String, price: Float): Product
  }
`;

module.exports = productTypeDefs;
