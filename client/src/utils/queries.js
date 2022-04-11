import gql from "graphql-tag";


export const GET_ME = gql`
{
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
query comments($username: String) {
    comments(username: $username) {
        _id
        commentText
        user
    }
}
`;

export const GET_COMMENT = gql`
query comment($_id: ID!) {
    comment(_id: $_id) {
        _id
        commentText
        user
    }
}
`;

export const GET_REACTIONS = gql`
query statuses($username: String) {
    statuses(username: $username) {
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

export const GET_REACTION = gql`
query status($_id: ID!) {
    status(_id: $_id) {
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

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;