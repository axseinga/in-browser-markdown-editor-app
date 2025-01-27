import { GraphQLClient } from "graphql-request";
import envConfig from "@/env-config";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${envConfig.CONTENTFUL_SPACE_ID}/environments/${envConfig.CONTENTFUL_ENVIRONMENT}`;

export const contentfulGraphQLClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${envConfig.CONTENTFUL_TOKEN}`,
  },
});
