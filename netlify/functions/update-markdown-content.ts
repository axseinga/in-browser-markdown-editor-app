import { contentfulClient } from "./utils/contentful-client";

exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const { newMarkdownContent, markdownId } = JSON.parse(event.body);

  if (!newMarkdownContent || !markdownId)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };

  try {
    const res = await contentfulClient.entry.get({
      entryId: markdownId,
    });

    if (!res.fields)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Markdown with given ID not found",
        }),
      };

    const fields = res.fields;
    fields.content = { "en-US": newMarkdownContent };

    const updateRes = await contentfulClient.entry.update(
      { entryId: markdownId },
      { sys: res.sys, fields },
    );

    if (!updateRes.fields)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error updating the markdown",
        }),
      };

    const publishedRes = await contentfulClient.entry.publish(
      { entryId: markdownId },
      updateRes,
    );

    if (!publishedRes.fields)
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
        data: updateRes.fields,
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
