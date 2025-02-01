import { contentfulClient } from "./utils/contentful-client";
import type { Handler } from "@netlify/functions";
import type { MarkdownItemT } from "../../src/types";

type EventBody = {
  markdownItem: MarkdownItemT;
  userId: string;
};

const validateRequestBody = (body: EventBody) => {
  if (
    !body.markdownItem ||
    !body.markdownItem.name ||
    !body.markdownItem.createdAt ||
    !body.userId
  ) {
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
  const { markdownItem, userId } = body;

  try {
    const entry = await contentfulClient.entry.create(
      { contentTypeId: "markdown" },
      {
        fields: {
          name: {
            "en-US": markdownItem.name,
          },
          createdAt: {
            "en-US": markdownItem.createdAt,
          },
          content: {
            "en-US": markdownItem.content ?? "",
          },
          author: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: userId,
              },
            },
          },
        },
      },
    );

    if (!entry.fields)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "The markdown with given ID was not found",
        }),
      };

    const publishedEntry = await contentfulClient.entry.publish(
      { entryId: entry.sys.id },
      entry,
    );

    if (!publishedEntry.fields)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error publishing the markdown",
        }),
      };

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Markdown created and published succesfully",
        data: {
          id: entry.sys.id,
        },
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
