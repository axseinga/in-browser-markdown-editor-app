import { IconDocument } from "@/components/icons/icon-document";
import { useAppState } from "@/state/app-state";
import { MarkdownItemT } from "@/types";
import { useEffect, useState } from "react";

type FileNameEditorProps = {
  activeFile: MarkdownItemT;
};

export const FileNameEditor = ({ activeFile }: FileNameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [docNameInput, setDocNameInput] = useState(activeFile.name);
  const { activeFileID } = useAppState();

  useEffect(() => {
    setDocNameInput(activeFile.name);
  }, [activeFile.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocNameInput(e.target.value);
  };

  const handleSaveInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      useAppState.getState().updateMarkdownItem(activeFileID, {
        ...activeFile,
        name: docNameInput,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="flex w-[55vw] items-center gap-3 md:w-[36vw]">
      <div className="flex-shrink-0">
        <IconDocument />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="body-in-app hidden text-customGrey-500 sm:flex">
          Document Name
        </p>
        <div
          className={`heading-m-in-app h-[22px] border-b-[1px] ${isEditing ? "w-full border-b-white" : "border-b-transparent"}`}
        >
          {isEditing ? (
            <input
              type="text"
              className="w-full bg-transparent"
              value={docNameInput}
              onChange={handleInputChange}
              onKeyDown={handleSaveInputChange}
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="transition-colors duration-300 hover:border-b-[1px] hover:text-customOrange"
            >
              <p className="translate-y-[2px] transform">{docNameInput}</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
