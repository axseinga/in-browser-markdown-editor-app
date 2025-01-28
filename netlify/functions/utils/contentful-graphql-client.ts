import { GraphQLClient } from "graphql-request";

const accessToken = process.env.VITE_CONTENTFUL_TOKEN;
const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
const environmentId = process.env.VITE_CONTENTFUL_ENVIRONMENT;

if (!accessToken || !spaceId || !environmentId) {
  throw new Error("Missing Contentful environment variables");
}

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environmentId}`;

export const contentfulGraphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
