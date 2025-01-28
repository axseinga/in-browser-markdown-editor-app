import { contentfulClient } from "./utils/contentful-client";

exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const { markdownItem, userId } = JSON.parse(event.body);
  if (
    !markdownItem ||
    !markdownItem.name ||
    !markdownItem.createdAt ||
    userId === ""
  )
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };

  try {
    const res = await contentfulClient.entry.create(
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

    if (!res.fields)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "The markdown with given ID was not found",
        }),
      };

    const publishedRes = await contentfulClient.entry.publish(
      { entryId: res.sys.id },
      res,
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
        message: "Markdown created and published succesfully",
        data: {
          id: res.sys.id,
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
