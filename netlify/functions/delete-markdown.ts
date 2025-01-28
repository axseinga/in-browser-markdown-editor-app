import { contentfulClient } from "./utils/contentful-client";

exports.handler = async (event) => {
  console.log("event.body", event.body);
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const { markdownId } = JSON.parse(event.body);

  if (!markdownId)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing markdown ID" }),
    };

  try {
    const res = await contentfulClient.entry.unpublish({
      entryId: markdownId,
    });

    if (!res.fields)
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
  }
};
