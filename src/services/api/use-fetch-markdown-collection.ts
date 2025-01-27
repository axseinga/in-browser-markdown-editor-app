import { useEffect, useState } from "react";
import { contentfulGraphQLClient } from "@/services/graphql/contentful-client";
import { getMarkdownsQuery } from "@/services/graphql/queries/get-markdowns-by-email";
import { MarkdownCollectionResponse } from "@/types";
import { welcomeFile } from "@/data";
import { useAppState } from "@/state/app-state";

export const useFetchMarkdownCollection = (email: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMarkdownCollection = async (email: string) => {
      try {
        setIsLoading(true);
        const variables = { email };
        const data = await contentfulGraphQLClient.request<MarkdownCollectionResponse>(
          getMarkdownsQuery,
          variables,
        );
  
        const items = data?.markdownCollection?.items ?? [];
        const itemsWithInitialFile = [...items, welcomeFile];
        useAppState.getState().setMarkdownItems(itemsWithInitialFile);
      } catch (error) {
        console.log(error);
        setError(true);
        useAppState.getState().setMarkdownItems([welcomeFile]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdownCollection(email);

  }, [email]);

  return { isLoading, error };
};
