const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID
    username: String 
    email: String
    status: Status
  }

  type Comment {
      _id:ID
      commentText:String
      user:String
  }

  type Auth {
    token: ID
    user: User
  }

  type Habit {
    type Category {
      _id: ID
      name: String
    }
  
    type Product {
      _id: ID
      name: String
      description: String
      image: String
      quantity: Int
      price: Float
      category: Category
    }
  
    type Order {
      _id: ID
      purchaseDate: String
      products: [Product]
    }

    type Checkout {
      session: ID
    }

      _id: ID
      name:String
      description:String
  }

  type Status {
    _id: ID!
    statusText:String
    username:String
    createdAt:String
    comments:[Comment]
  }

  type Query{
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    me: User
    users:[User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
    statuses(username: String): [Status]
    status(_id: ID!): Status 
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String!, username: String!): Status
    addReaction(statusText: String!): Status
    updateProduct(_id: ID!, quantity: Int!): Product
    addOrder(products: [ID]!): Order
  }
  `;

module.exports = typeDefs;
