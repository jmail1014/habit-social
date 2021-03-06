import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!) {
    addComment(commentText: $commentText) {
      _id
        commentText
        createdAt
        username
        Count
        reactions {
            _id
       }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($commentId: ID!, $statusText: String!) {
    addReaction(commentId:$commentId, statusText: $statusText) {
      _id
        Count
        reactions {
            _id
            createdAt
            statusText
            username
        }    
    }
  }
`;
