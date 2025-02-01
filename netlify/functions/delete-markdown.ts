import { contentfulClient } from "./utils/contentful-client";
import type { Handler } from "@netlify/functions";

type EventBody = {
  markdownId: string;
};

const validateRequestBody = (body: EventBody) => {
  if (!body.markdownId) {
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
      body: JSON.stringify({ message: "Missing markdown ID" }),
    };
  }

  const { markdownId } = body;

  try {
    const unpublishedEntry = await contentfulClient.entry.unpublish({
      entryId: markdownId,
    });

    if (!unpublishedEntry.fields)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error unpublishing the markdown",
        }),
      };

    await contentfulClient.entry.delete({
      entryId: markdownId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Markdown has been deleted succesfully",
        data: null,
      }),
    };
  } catch (error) {
    console.error("Error deleting entry:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
};
