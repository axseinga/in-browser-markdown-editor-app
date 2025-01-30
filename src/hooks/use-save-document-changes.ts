import { updateMarkdownContent } from "@/services/api/markdown/update-markdown-content";
import { useAppState } from "@/state/app-state";
import { DialogIdEnum, MarkdownItemT } from "@/types";

type UseSaveDocumentChangesProps = {
  activeFile: MarkdownItemT;
};

export const useSaveDocumentChanges = ({
  activeFile,
}: UseSaveDocumentChangesProps) => {
  const {
    activeFileID,
    editingContent,
    user,
    updateMarkdownItem,
    setIsDialogOpen,
    setDialogId,
  } = useAppState((state) => state);

  const saveDocumentChanges = async () => {
    setDialogId(DialogIdEnum.SAVE_ACTION);
    updateMarkdownItem(activeFileID, {
      ...activeFile,
      content: editingContent,
    });

    if (user) {
      try {
        const response = await updateMarkdownContent({
          newMarkdownContent: editingContent,
          markdownId: activeFileID,
        });
        if (response.status !== 200) {
          console.error("Error updating markdown content:", response.message);
        }
      } catch (error) {
        console.error("Error updating markdown content:", error);
      }
    }

    setTimeout(() => {
      setIsDialogOpen(true);
    }, 500);
  };

  return { saveDocumentChanges };
};
