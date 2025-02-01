import bcrypt from "bcryptjs";
import { contentfulClient } from "./utils/contentful-client";
import { contentfulGraphQLClient } from "./utils/contentful-graphql-client";
import { UserCollectionResponse } from "../../src/types";
import { getUserByEmailQuery } from "./utils/queries/get-user-by-email";
import type { Handler } from "@netlify/functions";

type EventBody = {
  name: string;
  email: string;
  password: string;
};

const validateRequestBody = (body: EventBody) => {
  if (!body.name || !body.email || !body.password) {
    return false;
  }
  return true;
};

export const handler: Handler = async (event) => {
  console.log("inside");
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

  const { name, email, password } = body;

  const variables = { email };

  const response =
    await contentfulGraphQLClient.request<UserCollectionResponse>(
      getUserByEmailQuery,
      variables,
    );

  const user = response?.userCollection?.items?.[0] ?? null;

  if (user)
    return {
      statusCode: 409,
      body: JSON.stringify({
        message: "The user with given email already exists.",
      }),
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const createdUserEntry = await contentfulClient.entry.create(
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

    if (!createdUserEntry.fields)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "The markdown with given ID was not found",
        }),
      };

    const publishedUserEntry = await contentfulClient.entry.publish(
      { entryId: createdUserEntry.sys.id },
      createdUserEntry,
    );

    if (!publishedUserEntry.fields)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "There was an error while publishing the user",
        }),
      };

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User registered successfully",
        data: publishedUserEntry.sys.id,
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
