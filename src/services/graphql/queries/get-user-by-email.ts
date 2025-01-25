import { gql } from "graphql-request";

export const getUserByEmailQuery = gql`
  query GetUserByEmail($email: String!) {
    userCollection(where: { email: $email }) {
      items {
        sys {
          id
        }
        name
        email
        password
        itemsCollection {
          items {
            sys {
              id
            }
            createdAt
            name
            content
          }
        }
      }
    }
  }
`;
