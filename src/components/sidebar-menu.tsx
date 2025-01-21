import { useAppState } from "@/state/app-state";
import { IconDocument } from "@/components/icons/icon-document";
import { ThemeToggle } from "@/components/theme-toggle";

export const SidebarMenu = () => {
  const { showSidebar } = useAppState();

  return (
    <div
      className={`flex min-h-screen w-[15.625rem] flex-shrink-0 transform flex-col justify-between bg-customGrey-900 p-6 pb-10 text-customGrey-200 transition-all duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-grow flex-col gap-7">
        <p className="font-commissioner text-[0.938rem] font-semibold uppercase tracking-[5px] md:hidden">
          Markdown
        </p>
        <p className="heading-s-in-app uppercase text-customGrey-500">
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
          <p className="body-in-app text-customGrey-500">01 April 2022</p>
          <p>welcome.md</p>
        </div>
      </div>
    </li>
  );
};
