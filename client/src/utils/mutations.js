import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            firstName
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, password: String!) {
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
        statusText
        username
        createdAt
        comments {
            _id
            commentText
            User
        }
    }
}
`;

export const ADD_STATUS = gql`
mutation addStatus($statusText: String!) {
    addStatus(statusText = $statusText) {
        _id
        statusText
        username
        createdAt
        comments {
            _id
            commentText
            User
        }
    }
}
`;