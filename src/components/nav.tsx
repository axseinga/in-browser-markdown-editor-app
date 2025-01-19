import { useState } from "react";
import { IconDelete } from "@/components/icons/icon-delete";
import { IconSave } from "@/components/icons/icon-save";
import { IconDocument } from "@/components/icons/icon-document";
import { HambugerMenu } from "./hamburger-menu";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="font-roboto flex h-14 items-center bg-customlightGrey-800 text-white">
      <HambugerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex w-full items-center justify-between pl-5 pr-2">
        <div>
          {/* <p>doc name</p> */}
          <div className="flex items-center gap-2">
            <IconDocument />
            <p className="text-heading-m-in-app">welcome.md</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Delete file">
            <IconDelete />
          </button>
          <button className="bg-customOrange hover:bg-customOrangeHover flex items-center gap-2 rounded-md p-3 transition-all duration-300">
            <IconSave />
            {/* <p>Save Changes</p> */}
          </button>
        </div>
      </div>
    </nav>
  );
};
