import { getUserByEmailQuery } from "./utils/queries/get-user-by-email";
import bcrypt from "bcryptjs";
import { contentfulGraphQLClient } from "./utils/contentful-graphql-client";
import { UserCollectionResponse } from "../../src/types";
import type { Handler } from "@netlify/functions";

type EventBody = {
  email: string;
  password: string;
};

const validateRequestBody = (body: EventBody) => {
  if (!body.email || !body.password) {
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

  const { email, password } = body;

  try {
    const variables = { email };

    const userResponse =
      await contentfulGraphQLClient.request<UserCollectionResponse>(
        getUserByEmailQuery,
        variables,
      );

    const user = userResponse?.userCollection?.items?.[0] ?? null;

    if (!user)
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "User with given email not found",
        }),
      };

    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");

    if (!isPasswordValid)
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Invalid password",
        }),
      };

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        data: {
          email: user.email,
          name: user.name,
          sys: {
            id: user.sys.id,
          },
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
