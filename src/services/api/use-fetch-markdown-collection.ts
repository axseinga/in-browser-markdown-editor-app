import { useEffect, useState } from "react";
import { contentfulClient } from "@/services/graphql/contentful-client";
import { getMarkdownsQuery } from "@/services/graphql/queries/get-users-markdowns-by-email";
import { UserCollectionResponse, MarkdownItemT } from "@/types";
import { welcomeFile } from "@/data";

export const useFetchMarkdownCollection = () => {
  const [markdownItems, setMarkdownItems] = useState<MarkdownItemT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const email = "test@test.com";

  useEffect(() => {
    const fetchMarkdownCollection = async (email: string) => {
      try {
        const variables = { email };
        const data = await contentfulClient.request<UserCollectionResponse>(
          getMarkdownsQuery,
          variables,
        );
        const items =
          data?.userCollection.items?.[0]?.itemsCollection?.items ?? [];
        const itemsWithInitialFile = [...items, welcomeFile];
        setMarkdownItems(itemsWithInitialFile);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdownCollection(email);
  }, []);

  return { markdownItems, loading, error };
};
