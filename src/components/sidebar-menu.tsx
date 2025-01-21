import { IconDocument } from "./icons/icon-document";
import { ThemeToggle } from "./theme-toggle";

type SidebarMenuProps = {
  isOpen: boolean;
};

export const SidebarMenu = ({ isOpen }: SidebarMenuProps) => {
  return (
    <div
      className={`text-customGrey-200 bg-customGrey-900 h-screen w-[15.625rem] flex-shrink-0 transform justify-between p-6 pb-10 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col gap-7">
        <p className="uppercase tracking-[5px]">Markdown</p>
        <p className="text-customGrey-500 heading-s-in-app uppercase">
          My documents
        </p>
        <button className="heading-m-in-app w-full rounded-md bg-customOrange px-4 py-3 hover:bg-customOrangeHover">
          + New Document
        </button>
        <ul className="flex flex-col gap-4">
          <SidebarMenuDocumentItem />
          <SidebarMenuDocumentItem />
        </ul>
      </div>
      <ThemeToggle id="theme-toggle" />
    </div>
  );
};

const SidebarMenuDocumentItem = () => {
  return (
    <li className="flex shrink-0">
      <div className="flex shrink-0 items-center gap-4">
        <IconDocument />
        <div className="flex flex-col">
          <p className="text-customGrey-500 body-in-app">01 April 2022</p>
          <p>welcome.md</p>
        </div>
      </div>
    </li>
  );
};
