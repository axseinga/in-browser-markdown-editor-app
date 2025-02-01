import { contentfulClient } from "./utils/contentful-client";
import type { Handler } from "@netlify/functions";

type EventBody = {
  newMarkdownContent: string;
  markdownId: string;
};

const validateRequestBody = (body: EventBody) => {
  if (!body.newMarkdownContent || !body.markdownId) {
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

  const { newMarkdownContent, markdownId } = body;

  try {
    const entry = await contentfulClient.entry.get({
      entryId: markdownId,
    });

    if (!entry.fields)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Markdown with given ID not found",
        }),
      };

    const fields = entry.fields;
    fields.content = { "en-US": newMarkdownContent };

    const updatedEntry = await contentfulClient.entry.update(
      { entryId: markdownId },
      { sys: entry.sys, fields },
    );

    if (!updatedEntry.fields)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error updating the markdown",
        }),
      };

    const publishedEntry = await contentfulClient.entry.publish(
      { entryId: markdownId },
      updatedEntry,
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
        message: "Markdown updated and published succesfully",
        data: updatedEntry.fields,
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
