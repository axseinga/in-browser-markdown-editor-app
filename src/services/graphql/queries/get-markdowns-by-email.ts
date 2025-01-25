import { gql } from "graphql-request";

export const getMarkdownsQuery = gql`
  query GetMarkdownsByEmail($email: String!) {
    markdownCollection(where: { author: { email: $email } }) {
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
`;
