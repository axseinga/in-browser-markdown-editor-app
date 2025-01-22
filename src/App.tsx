import { useMemo, useState } from "react";
import { Nav } from "./components/nav";
import { SidebarMenu } from "./components/sidebar-menu";
import { PreviewWindow } from "./containers/preview-window";
import { MarkdownWindow } from "./containers/markdown-window";
import { useAppState } from "./state/app-state";
import { useFetchMarkdownCollection } from "@/services/api/use-fetch-markdown-collection";
import { welcomeFile } from "./data";
import { Modal } from "./components/modal";

const App = () => {
  const { markdownItems, error, loading } = useFetchMarkdownCollection();
  const [activeFileID, setActiveFileID] = useState<string>(welcomeFile.sys.id);
  const { showSidebar, showMarkdown } = useAppState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeFile = useMemo(() => {
    return (
      markdownItems.find((file) => file.sys.id === activeFileID) ?? welcomeFile
    );
  }, [markdownItems, activeFileID]);

  return (
    <>
      <div className="relative flex overflow-hidden">
        <SidebarMenu
          items={markdownItems.map((file) => {
            return {
              id: file.sys.id,
              name: file.name,
              createdAt: file.createdAt,
            };
          })}
          setActiveFileID={setActiveFileID}
        />
        <div
          className={`w-full flex-shrink-0 transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-[15.625rem]"
          }`}
        >
          <Nav fileName={activeFile.name} setIsDialogOpen={setIsDialogOpen} />
          <div
            className={`flex flex-col sm:grid ${showMarkdown ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {showMarkdown && <MarkdownWindow data={activeFile.content} />}
            <PreviewWindow data={activeFile.content} />
          </div>
        </div>
      </div>
      <Modal isOpen={isDialogOpen} setIsModalOpen={setIsDialogOpen} id="delete-dialog"/>
    </>
  );
};

export default App;
