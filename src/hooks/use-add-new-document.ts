import { createMarkdown } from "@/services/api/markdown/create-markdown";
import { useAppState } from "@/state/app-state";

export const useAddNewDocument = () => {
  const { user, addMarkdownItem, setActiveFileID, updateMarkdownItem } =
    useAppState((state) => state);

  const addNewDocument = async () => {
    const now = new Date();
    const tempID = `tempID_${now}_${now.getTime()}`;
    const updatedMarkdown = {
      sys: {
        id: tempID,
      },
      createdAt: now.toISOString(),
      name: "untitled-file.md",
      content: "",
    };
    addMarkdownItem(updatedMarkdown);
    setActiveFileID(tempID);

    if (!user) return;

    try {
      const res = await createMarkdown({
        markdownItem: {
          sys: {
            id: tempID,
          },
          createdAt: now.toISOString(),
          name: "untitled-file.md",
          content: "",
        },
        userId: user?.id || "",
      });

      if (res.data.id) {
        updatedMarkdown.sys.id = res.data.id;
        updateMarkdownItem(tempID, updatedMarkdown);
        setActiveFileID(res.data.id);
      }
    } catch (error) {
      console.error("Error creating markdown:", error);
    }
  };

  return { addNewDocument };
};
