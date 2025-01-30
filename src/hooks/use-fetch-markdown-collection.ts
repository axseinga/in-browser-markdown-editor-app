import { useEffect, useState } from "react";
import { welcomeFile } from "@/data";
import { useAppState } from "@/state/app-state";
import { getAllUserMarkdowns } from "@/services/api/markdown/get-all-user-markdowns";

export const useFetchMarkdownCollection = (email: string) => {
  const { setMarkdownItems } = useAppState((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!email) {
      return;
    }
    const fetchMarkdownCollection = async (email: string) => {
      try {
        setIsLoading(true);
        const res = await getAllUserMarkdowns({ email });

        if (res.status === 200) {
          const itemsWithInitialFile = [...res.data, welcomeFile];
          setMarkdownItems(itemsWithInitialFile);
        } else {
          setMarkdownItems([welcomeFile]);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setMarkdownItems([welcomeFile]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdownCollection(email);
  }, [email, setMarkdownItems]);

  return { isLoading, error };
};
