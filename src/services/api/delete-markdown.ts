import { contentfulClient } from "@/services/api/contentful-client";

export const deleteMarkdown = async (markdownId: string) => {
  try {
    const res = await contentfulClient.entry.unpublish({
      entryId: markdownId,
    });

    if (!res.fields)
      return {
        status: 500,
        message: "There was an error unpublishing the markdown",
      };

    await contentfulClient.entry.delete({
      entryId: markdownId,
    });

    return {
      status: 200,
      message: "Markdown has been deleted succesfully",
      data: null,
    };
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
};
