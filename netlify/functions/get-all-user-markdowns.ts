import { getMarkdownsQuery } from "./utils/queries/get-markdowns-by-email";
import { contentfulGraphQLClient } from "./utils/contentful-graphql-client";
import { MarkdownCollectionResponse } from "../../src/types";

exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const { email } = JSON.parse(event.body);

  if (!email)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing user email" }),
    };

  try {
    const variables = { email };
    const data =
      await contentfulGraphQLClient.request<MarkdownCollectionResponse>(
        getMarkdownsQuery,
        variables,
      );

    const items = data?.markdownCollection?.items ?? [];

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User markdowns fetched successfully",
        data: items,
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
