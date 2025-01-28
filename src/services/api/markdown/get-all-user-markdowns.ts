import envConfig from "@/env-config";
import axios from "axios";

export const getAllUserMarkdowns = async (data: { email: string }) => {
  try {
    const response = await axios.post(
      `${envConfig.NETLIFY_SERVERLESS_FUNCTIONS_URL}/get-all-user-markdowns`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status !== 200) {
      return {
        status: response.status,
        message: response.statusText,
      };
    }

    const result = response.data;

    return {
      status: 200,
      message: "User markdowns fetched successfully",
      data: result.data,
    };
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
      };
    } else {
      return { status: 500, message: "Internal server error" };
    }
  }
};
