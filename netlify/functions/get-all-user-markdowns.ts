import { getMarkdownsQuery } from "./utils/queries/get-markdowns-by-email";
import { contentfulGraphQLClient } from "./utils/contentful-graphql-client";
import { MarkdownCollectionResponse } from "../../src/types";
import type { Handler } from "@netlify/functions";

type EventBody = {
  email: string;
};

const validateRequestBody = (body: EventBody) => {
  if (!body.email) {
    return false;
  }
  return true;
};

export const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const body: EventBody = JSON.parse(event.body);
  if (!validateRequestBody(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };
  }

  const { email } = body;

  try {
    const variables = { email };

    const markdownResponse =
      await contentfulGraphQLClient.request<MarkdownCollectionResponse>(
        getMarkdownsQuery,
        variables,
      );

    const markdownItems = markdownResponse?.markdownCollection?.items ?? [];

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User markdowns fetched successfully",
        data: markdownItems,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
