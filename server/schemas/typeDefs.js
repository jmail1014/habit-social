const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    comments: [Comment]
}

type Comment {
    _id: ID
    commentText: String
    createdAt: String
    username: String
    Count:Int
    reactions: [Reaction]
}

type Auth {
    token: ID
    user: User
}

type Habit {
    _id: ID
    name: String
    description: String
}
  
type Reaction {
  _id: ID
  statusText: String
  username: String
  createdAt: String
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments(username: String!): [Comment]
    comment(_id: ID!): Comment
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(commentText: String! ): Comment
    addReaction(commentId: ID!, statusText: String!): Comment

}

`;

module.exports = typeDefs;
