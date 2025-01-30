import { useAppState } from "@/state/app-state";
import { IconDocument } from "@/components/icons/icon-document";
import { ThemeToggle } from "@/components/theme-toggle";
import { MarkdownMenuItem } from "@/types";
import { formatDate } from "@/utils/format-date";
import { useMemo } from "react";
import { sortMarkdownsByDate } from "@/utils/sort-markdowns-by-date";
import { useAddNewDocument } from "@/hooks/use-add-new-document";

type SidebarMenuProps = {
  items: MarkdownMenuItem[];
  isError?: boolean;
};

export const SidebarMenu = ({ items, isError }: SidebarMenuProps) => {
  const { showSidebar } = useAppState((state) => state);
  const { addNewDocument } = useAddNewDocument();

  const sortedItems = useMemo(() => {
    return sortMarkdownsByDate(items) as MarkdownMenuItem[];
  }, [items]);

  return (
    <div
      className={`flex min-h-screen w-[15.625rem] flex-shrink-0 transform flex-col justify-between bg-customGrey-900 p-6 pb-10 text-customGrey-200 transition-all duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-[92vh] flex-col justify-between">
        <div className="flex flex-grow flex-col gap-7">
          <p className="font-commissioner text-[0.938rem] font-semibold uppercase tracking-[5px] md:hidden">
            Markdown
          </p>
          <p className="heading-s-in-app uppercase text-customGrey-500">
            My documents
          </p>
          <button
            onClick={addNewDocument}
            className="heading-m-in-app w-full rounded-md bg-customOrange px-4 py-3 hover:bg-customOrangeHover"
          >
            + New Document
          </button>
          <div aria-live="polite">
            {isError ? (
              <p>Something went wrong retrieving files...</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {sortedItems.map((item) => (
                  <SidebarMenuDocumentItem
                    key={`SidebarMenuItem_${item.id}`}
                    item={item}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        <ThemeToggle id="theme-toggle" />
      </div>
    </div>
  );
};

type SidebarMenuDocumentItemProps = {
  item: MarkdownMenuItem;
};

const SidebarMenuDocumentItem = ({ item }: SidebarMenuDocumentItemProps) => {
  const { setActiveFileID } = useAppState((state) => state);
  const date = formatDate(item.createdAt);

  return (
    <li className="flex shrink-0">
      <button
        className="flex shrink-0 items-center gap-4 hover:text-customOrange"
        onClick={() => setActiveFileID(item.id)}
      >
        <IconDocument />
        <div className="flex flex-col text-left">
          <p className="body-in-app text-customGrey-500">{date}</p>
          <p>{item.name}</p>
        </div>
      </button>
    </li>
  );
};
