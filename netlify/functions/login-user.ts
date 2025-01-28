import { getUserByEmailQuery } from "./utils/queries/get-user-by-email";
import bcrypt from "bcryptjs";
import { contentfulGraphQLClient } from "./utils/contentful-graphql-client";
import { UserCollectionResponse } from "../../src/types";

exports.handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing request body" }),
    };
  }

  const { email, password } = JSON.parse(event.body);

  if (!email || !password)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing required fields" }),
    };

  try {
    const variables = { email };

    const response =
      await contentfulGraphQLClient.request<UserCollectionResponse>(
        getUserByEmailQuery,
        variables,
      );

    const user = response?.userCollection?.items?.[0] ?? null;

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
