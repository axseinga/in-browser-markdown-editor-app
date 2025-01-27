import { IconDocument } from "@/components/icons/icon-document";
import { welcomeFile } from "@/data";
import { updateMarkdownName } from "@/services/api/update-markdown-name";
import { useAppState } from "@/state/app-state";
import { MarkdownItemT } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

type FileNameEditorProps = {
  activeFile: MarkdownItemT;
};

export const FileNameEditor = ({ activeFile }: FileNameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [docNameInput, setDocNameInput] = useState(activeFile.name);
  const { activeFileID, user } = useAppState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDocNameInput(activeFile.name);
  }, [activeFile.name]);

  useEffect(() => {
    setDocNameInput(activeFile.name);
  }, [activeFileID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocNameInput(e.target.value);
  };

  const saveInputChange = useCallback(async () => {
    const updatedMarkdownItem = {
      ...activeFile,
      name: docNameInput,
    };
    useAppState
      .getState()
      .updateMarkdownItem(activeFileID, updatedMarkdownItem);
    setIsEditing(false);

    if (user) {
      try {
        const response = await updateMarkdownName({
          newMarkdownName: docNameInput,
          markdownId: activeFileID,
        });
        if (response.status !== 200) {
          console.log("Error updating markdown");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [activeFile, activeFileID, docNameInput, user]);

  const handleSaveInputChange = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      try {
        await saveInputChange();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        saveInputChange();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, saveInputChange]);

  return (
    <div className="flex items-center gap-3 sm:w-[55vw] md:w-[36vw]">
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
              ref={inputRef}
              type="text"
              className="w-full bg-transparent caret-customOrange focus:outline-none focus:ring-2 focus:ring-customOrangeHover"
              value={docNameInput}
              onChange={handleInputChange}
              onKeyDown={handleSaveInputChange}
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              disabled={activeFile.sys.id === welcomeFile.sys.id}
              className={`${activeFile.sys.id === welcomeFile.sys.id ? "cursor-not-allowed" : "cursor-pointer transition-colors duration-300 hover:border-b-[1px] hover:text-customOrange"}`}
            >
              <p className="translate-y-[2px] transform">{docNameInput}</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
