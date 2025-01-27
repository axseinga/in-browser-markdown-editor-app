import { MarkdownItemT } from "@/types";
import { contentfulClient } from "./contentful-client";

export const createMarkdown = async ({
  markdownItem,
  userId,
}: {
  markdownItem: MarkdownItemT;
  userId: string;
}) => {
  if (
    !markdownItem ||
    !markdownItem.name ||
    !markdownItem.createdAt ||
    userId === ""
  )
    return { status: 400, message: "Request Body Mismatch" };
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
        status: 404,
        message: "The markdown with given ID was not found",
      };

    const publishedRes = await contentfulClient.entry.publish(
      { entryId: res.sys.id },
      res,
    );

    if (!publishedRes.fields)
      return {
        status: 500,
        message: "There was an error publishing the markdown",
      };

    return {
      status: 200,
      message: "Markdown created and published succesfully",
      id: res.sys.id,
    };
  } catch (error) {
    console.error("Error creating markdown:", error);
    return { status: 500, message: "Internal server error" };
  }
};
