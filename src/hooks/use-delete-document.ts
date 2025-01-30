import { deleteMarkdown } from "@/services/api/markdown/delete-markdown";
import { useAppState } from "@/state/app-state";
import { useEffect, useState } from "react";

export const useDeleteDocument = (fileName: string) => {
  const {
    activeFileID,
    markdownItems,
    user,
    deleteMarkdownItem,
    setActiveFileID,
    setIsDialogOpen,
  } = useAppState((state) => state);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deletedFileName, setDeletedFileName] = useState(fileName);

  const deleteDocument = async () => {
    try {
      setDeletedFileName(fileName);
      deleteMarkdownItem(activeFileID);

      if (user) {
        await deleteMarkdown({ markdownId: activeFileID });
      }
      setSuccess(true);
    } catch (error) {
      console.error("Error deleting markdown:", error);
      setError(true);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        if (markdownItems.length > 0) {
          setActiveFileID(markdownItems[0].sys.id);
        }
        setIsDialogOpen(false);
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, setIsDialogOpen, markdownItems, setActiveFileID]);

  return { deleteDocument, error, success, deletedFileName };
};
