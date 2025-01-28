import * as contentful from "contentful-management";

const accessToken = process.env.VITE_CONTENTFUL_CMA_TOKEN;
const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
const environmentId = process.env.VITE_CONTENTFUL_ENVIRONMENT;

if (!accessToken || !spaceId || !environmentId) {
  throw new Error("Missing Contentful environment variables");
}

export const contentfulClient = contentful.createClient(
  {
    accessToken: accessToken,
  },
  {
    type: "plain",
    defaults: {
      spaceId: spaceId,
      environmentId: environmentId,
    },
  },
);
