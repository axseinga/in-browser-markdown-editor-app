import { IconDelete } from "@/components/icons/icon-delete";
import { IconSave } from "@/components/icons/icon-save";
import { IconDocument } from "@/components/icons/icon-document";
import { HambugerMenu } from "./hamburger-menu";

export const Nav = () => {

  return (
    <nav className="bg-customGrey-800 flex h-14 w-full flex-shrink-0 items-center text-white">
      <HambugerMenu/>
      <div className="flex w-full items-center justify-between pl-5 pr-2">
        <div>
          {/* <p>doc name</p> */}
          <div className="flex items-center gap-3">
            <IconDocument />
            <p className="heading-m-in-app">welcome.md</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Delete file">
            <IconDelete />
          </button>
          <button className="flex items-center gap-2 rounded-md bg-customOrange p-3 transition-all duration-300 hover:bg-customOrangeHover">
            <IconSave />
            {/* <p>Save Changes</p> */}
          </button>
        </div>
      </div>
    </nav>
  );
};
