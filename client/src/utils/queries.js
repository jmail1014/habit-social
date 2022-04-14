import { gql } from '@apollo/client';

export const GET_ME = gql`
{
   me {
       _id
       username
       email
       comments {
        commentText
        createdAt
        username
        Count
        reactions {
            _id
            createdAt
            statusText
            username
        }
       }

   }
}
`;

// export const GET_USERS = gql`
// {
//     users {
//     _id
//     username
//     email
//     status {
//         _id
//         statusText
//         username
//         createdAt
//         comments {
//             _id
//             commentText
//             user
//         } 
//     }
// }
// }
// `;

export const GET_USER = gql`
    query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        comments {
            _id
            commentText
            createdAt
            username
            Count
        }
    }
}
`;

// export const GET_COMMENTS = gql`
// query comments($username: String) {
//     comments(username: $username) {
//         _id
//         comments {
//             commentText
//             createdAt
//             Count
//             reactions {
//                 _id
//                 createdAt
//                 statusText
//                 username
//             }
//         }
//     }
// }
// `;

export const GET_COMMENT = gql`
query comment($_id: ID!) {
    comment(_id: $_id) {
        _id
            commentText
            createdAt
            username
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

// export const GET_REACTIONS = gql`
// query statuses($username: String!) {
//     statuses(username: $username) {
//         _id
//         statusText
//         username
//         createdAt
//         comments {
//             _id
//             commentText
//             user
//         }
//     }
// }
// `;

// export const GET_REACTION = gql`
// query status($_id: ID!) {
//     status(_id: $_id) {
//         _id
//         statusText
//         username
//         createdAt
       
//     }
// }
// `;
