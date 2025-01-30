import { IconSave } from "@/components/icons/icon-save";
import { welcomeFile } from "@/data";
import { updateMarkdownContent } from "@/services/api/markdown/update-markdown-content";
import { useAppState } from "@/state/app-state";
import { DialogT, MarkdownItemT } from "@/types";

type SaveFileChangesButtonProps = {
  activeFile: MarkdownItemT;
  setDialogId: (id: DialogT) => void;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export const SaveFileChangesButton = ({
  activeFile,
  setDialogId,
  setIsDialogOpen,
}: SaveFileChangesButtonProps) => {
  const { activeFileID, editingContent, user, updateMarkdownItem } =
    useAppState((state) => state);

  const saveFileChanges = async () => {
    setDialogId("saveAction");
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

  return (
    <button
      onClick={saveFileChanges}
      className={`ml-1 flex items-center gap-2 rounded-md bg-customOrange p-3 sm:ml-4 sm:px-4 md:min-w-[150px] ${activeFile.sys.id === welcomeFile.sys.id ? "cursor-not-allowed" : "cursor-pointer transition-all duration-300 hover:bg-customOrangeHover"}`}
      disabled={activeFile.sys.id === welcomeFile.sys.id}
    >
      <IconSave />
      <p className="heading-m-in-app hidden font-light sm:flex">Save Changes</p>
    </button>
  );
};
