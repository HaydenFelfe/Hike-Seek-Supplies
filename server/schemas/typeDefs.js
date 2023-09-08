const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        cart: [Product]
    }

    type Product {
        _id: ID
        title: String
        description: String
        price: Float
        image: String
        productId: String
    }

    type Query {
        me: User
        getAllProducts: [Product]
        getCampingProducts: [Product]
        getHikingProducts: [Product]
        getWaterProducts: [Product]
        getSnowProducts: [Product]
        getTravelProducts: [Product]
        getUsedProducts: [Product]
        getDiscountedProducts: [Product]
        getUserCart: [Product]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addToCart(productId: ID!): User
        removeFromCart(productId: ID!): User
    }

    type Auth {
        token: String
        user: User
    }
`;

module.exports = typeDefs;