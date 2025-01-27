import { getUserByEmailQuery } from "../graphql/queries/get-user-by-email";
import bcrypt from "bcryptjs";
import { contentfulGraphQLClient } from "../graphql/contentful-client";
import { UserCollectionResponse } from "@/types";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const variables = { email };

    const response =
      await contentfulGraphQLClient.request<UserCollectionResponse>(
        getUserByEmailQuery,
        variables,
      );

    const user = response?.userCollection?.items?.[0] ?? null;

    if (!user) return { status: 404, message: "User not found" };

    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");

    if (!isPasswordValid) return { status: 401, message: "Invalid password" };

    return {
      status: 200,
      message: "Login successful",
      data: {
        email: user.email,
        name: user.name,
        sys: {
          id: user.sys.id,
        },
      },
    };
  } catch (error) {
    console.error("Error during loggin in user:", error);
    return { status: 500, message: "Internal server error" };
  }
};
