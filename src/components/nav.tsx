import { IconDelete } from "@/components/icons/icon-delete";
import { IconSave } from "@/components/icons/icon-save";
import { IconDocument } from "@/components/icons/icon-document";
import { HambugerMenu } from "./hamburger-menu";

export const Nav = () => {
  return (
    <nav className="flex h-14 w-full flex-shrink-0 items-center bg-customGrey-800 text-white sm:h-[4.5rem] sm:pr-2">
      <HambugerMenu />
      <p className="font-commissioner hidden border-r-[1px] border-customGrey-600 px-4 py-2 text-[0.938rem] font-semibold uppercase tracking-[4px] md:flex">
        Markdown
      </p>
      <div className="flex w-full items-center justify-between pl-5 pr-2">
        <div>
          <div className="flex items-center gap-3">
            <IconDocument />
            <div className="flex flex-col gap-1">
              <p className="body-in-app hidden text-customGrey-500 sm:flex">
                Document Name
              </p>
              <p className="heading-m-in-app">welcome.md</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <button aria-label="Delete file">
            <IconDelete />
          </button>
          <button className="flex items-center gap-2 rounded-md bg-customOrange p-3 transition-all duration-300 hover:bg-customOrangeHover sm:px-4">
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
