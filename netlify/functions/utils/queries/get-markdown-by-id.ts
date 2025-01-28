import { gql } from "graphql-request";

export const getMarkdownVersionByIdQuery = gql`
  query GetMarkdownVersionById($id: String!) {
    markdownCollection(where: { sys: { id: $id } }) {
      items {
        sys {
          id
          version
        }
      }
    }
  }
`;
