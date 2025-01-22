import { IconDelete } from "@/components/icons/icon-delete";
import { IconSave } from "@/components/icons/icon-save";
import { IconDocument } from "@/components/icons/icon-document";
import { HambugerMenu } from "./hamburger-menu";
import { useEffect, useState } from "react";

type NavProps = {
  fileName: string;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export const Nav = ({ fileName, setIsDialogOpen }: NavProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [docNameInput, setDocNameInput] = useState(fileName);

  useEffect(() => {
    setDocNameInput(fileName);
  }, [fileName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocNameInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // @todo save new file name
      setIsEditing(false);
    }
  };

  return (
    <nav className="flex h-14 w-full flex-shrink-0 items-center bg-customGrey-800 text-white sm:h-[4.5rem] sm:pr-2">
      <HambugerMenu />
      <p className="hidden border-r-[1px] border-customGrey-600 px-4 py-2 font-commissioner text-[0.938rem] font-semibold uppercase tracking-[4px] md:flex">
        Markdown
      </p>
      <div className="flex w-full items-center justify-between pl-5 pr-2">
        <div>
          <div className="flex w-[55vw] items-center gap-3 md:w-[36vw]">
            <IconDocument />
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
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="transition-colors duration-300 hover:border-b-[1px] hover:text-customOrange"
                  >
                    <p className="translate-y-[2px] transform">
                      {docNameInput}
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <button
            aria-label="Delete file"
            onClick={() => setIsDialogOpen(true)}
          >
            <IconDelete />
          </button>
          <button className="flex items-center gap-2 rounded-md bg-customOrange p-3 transition-all duration-300 hover:bg-customOrangeHover sm:px-4 md:min-w-[150px]">
            <IconSave />
            <p className="heading-m-in-app hidden font-light sm:flex">
              Save Changes
            </p>
          </button>
        </div>
      </div>
    </nav>
  );
};
