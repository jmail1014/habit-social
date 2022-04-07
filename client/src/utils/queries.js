import gql from "graphql-tag";

export const GET_ME = gql`
me {
    _id
    username
    email
    status {
        _id
        statusText
        username
        createdAt
        comments {
            _id
            commentText
            user
        }
    }
}
`;

export const GET_USERS = gql`
users {
    _id
    username
    email
    status {
        _id
        statusText
        username
        createdAt
        comments {
            _id
            commentText
            user
        } 
    }
}
`;

export const GET_USER = gql`
user($username: String) {
    user(username: $username) {
        _id
        username
        email
        status {
            _id
            statusText
            username
            createdAt
            comments {
                _id
                commentText
                user
            }
        }
    }
}
`;

export const GET_COMMENTS = gql`
comments($username: String) {
    comments(username: $username) {
        _id
        commentText
        user
    }
}
`;

export const GET_COMMENT = gql`
comment($_id: ID) {
    comment(_id: $_id) {
        _id
        commentText
        user
    }
}
`;
