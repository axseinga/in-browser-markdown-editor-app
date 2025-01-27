import { z } from "zod";

const env = z.object({
  VITE_CONTENTFUL_SPACE_ID: z.string(),
  VITE_CONTENTFUL_ENVIRONMENT: z.string(),
  VITE_CONTENTFUL_TOKEN: z.string(),
  VITE_CONTENTFUL_CMA_TOKEN: z.string(),
});

const envConfig = {
  CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_TOKEN: import.meta.env.VITE_CONTENTFUL_TOKEN,
  CONTENTFUL_CMA_TOKEN: import.meta.env.VITE_CONTENTFUL_CMA_TOKEN,
};

if (typeof window === "undefined") {
  env.parse(envConfig);
}

export default envConfig;
