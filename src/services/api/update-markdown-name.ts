import { contentfulClient } from "./contentful-client";

export const updateMarkdownName = async ({
  newMarkdownName,
  markdownId,
}: {
  newMarkdownName: string;
  markdownId: string;
}) => {
  if (!newMarkdownName)
    return { status: 400, message: "Request Body Mismatch" };

  try {
    const res = await contentfulClient.entry.get({
      entryId: markdownId,
    });

    if (!res.fields)
      return {
        status: 404,
        message: "The markdown with given ID was not found",
      };

    const fields = res.fields;
    fields.name = { "en-US": newMarkdownName };

    const updateRes = await contentfulClient.entry.update(
      { entryId: markdownId },
      { sys: res.sys, fields },
    );

    if (!updateRes.fields)
      return {
        status: 500,
        message: "There was an error updating the markdown",
      };

    const publishedRes = await contentfulClient.entry.publish(
      { entryId: markdownId },
      updateRes,
    );

    if (!publishedRes.fields)
      return {
        status: 500,
        message: "There was an error publishing the markdown",
      };

    return {
      status: 200,
      message: "Markdown updated and published succesfully",
      data: updateRes.fields,
    };
  } catch (error) {
    console.error("Error updating markdown:", error);
    return { status: 500, message: "Internal server error" };
  }
};
