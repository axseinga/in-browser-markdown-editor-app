import { gql } from "graphql-request";

export const getMarkdownsQuery = gql`
  query GetUsersMarkdownsByEmail($email: String!) {
    userCollection(where: { email: $email }) {
      items {
        sys {
          id
        }
        name
        email
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
