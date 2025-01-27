import bcrypt from "bcryptjs";
import { contentfulClient } from "@/services/api/contentful-client";

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const res = await contentfulClient.entry.create(
      { contentTypeId: "user" },
      {
        fields: {
          name: {
            "en-US": name,
          },
          email: {
            "en-US": email,
          },
          password: {
            "en-US": hashedPassword,
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
      data: null,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { status: 500, message: "Internal server error" };
  }
};
