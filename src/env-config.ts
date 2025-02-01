import { z } from "zod";

const env = z.object({
  VITE_NETLIFY_SERVERLESS_FUNCTIONS_URL: z.string(),
});

const envConfig = {
  NETLIFY_SERVERLESS_FUNCTIONS_URL: import.meta.env
    .VITE_NETLIFY_SERVERLESS_FUNCTIONS_URL,
};

if (typeof window === "undefined") {
  env.parse(envConfig);
}

export default envConfig;
