import { IconSave } from "@/components/icons/icon-save";
import { welcomeFile } from "@/data";
import { useSaveDocumentChanges } from "@/hooks/use-save-document-changes";
import { MarkdownItemT } from "@/types";

type SaveFileChangesButtonProps = {
  activeFile: MarkdownItemT;
};

export const SaveFileChangesButton = ({
  activeFile,
}: SaveFileChangesButtonProps) => {
  const { saveDocumentChanges } = useSaveDocumentChanges({ activeFile });

  return (
    <button
      onClick={saveDocumentChanges}
      className={`ml-1 flex items-center gap-2 rounded-md bg-customOrange p-3 sm:ml-4 sm:px-4 md:min-w-[150px] ${activeFile.sys.id === welcomeFile.sys.id ? "cursor-not-allowed" : "cursor-pointer transition-all duration-300 hover:bg-customOrangeHover"}`}
      disabled={activeFile.sys.id === welcomeFile.sys.id}
    >
      <IconSave />
      <p className="heading-m-in-app hidden font-light sm:flex">Save Changes</p>
    </button>
  );
};
