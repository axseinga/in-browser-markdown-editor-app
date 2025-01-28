import envConfig from "@/env-config";
import axios from "axios";

export const deleteMarkdown = async (data: { markdownId: string }) => {
  try {
    const response = await axios.post(
      `${envConfig.NETLIFY_SERVERLESS_FUNCTIONS_URL}/delete-markdown`,
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

    return {
      status: 200,
      message: "Markdown has been deleted succesfully",
      data: null,
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
