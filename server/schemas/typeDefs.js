const { gql } = require('apollo-server-express');


const typeDefs = gql`

type User {
    _id: ID!
    username:String!
    email: String
    status:[User]
  }

  type Comment {
      _id:ID!
      commentText:String
      username: String!
      User:String

  }

  type Auth {
    token: ID
    user: User
  }

  type Habit {
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
    me:User
    users:[User]
    user(username:String!): User
    comments(username:String): [Comment]
    comment(_id:ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String!, username:ID!): Status
    addStatus(statusText: String!): Status
    
  }
  `;

  module.exports = typeDefs;