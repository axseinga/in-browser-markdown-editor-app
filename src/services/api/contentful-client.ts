import * as contentful from "contentful-management";
import envConfig from "@/env-config";

export const contentfulClient = contentful.createClient(
  {
    accessToken: envConfig.CONTENTFUL_CMA_TOKEN,
  },
  {
    type: "plain",
    defaults: {
      spaceId: envConfig.CONTENTFUL_SPACE_ID,
      environmentId: envConfig.CONTENTFUL_ENVIRONMENT,
    },
  },
);
