import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { SidebarMenu } from "@/components/sidebar-menu";
import { useAppState } from "@/state/app-state";
import { welcomeFile } from "@/data";
import { Modal } from "@/components/modal";
import { MarkdownEditor } from "@/containers/markdown-editor";
import { DialogT } from "@/types";
import { useFetchMarkdownCollection } from "@/services/api/use-fetch-markdown-collection";
import { ModalBody } from "@/containers/modal-body";

const App = () => {
  const { showSidebar, showMarkdown, activeFileID, markdownItems, user } =
    useAppState();
  const [dialogId, setDialogId] = useState<DialogT>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { error } = useFetchMarkdownCollection(user?.email ?? "");

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
          isError={error}
        />
        <div
          className={`w-full flex-shrink-0 transition-transform duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-[15.625rem]"
          }`}
        >
          <Nav
            activeFile={activeFile}
            setIsDialogOpen={setIsDialogOpen}
            setDialogId={setDialogId}
          />
          <MarkdownEditor showMarkdown={showMarkdown} activeFile={activeFile} />
        </div>
      </div>
      <Modal
        isOpen={isDialogOpen}
        setIsModalOpen={setIsDialogOpen}
        id={`${dialogId}_modal`}
      >
        <ModalBody
          dialogId={dialogId}
          setIsDialogOpen={setIsDialogOpen}
          activeFileName={activeFile.name}
        />
      </Modal>
    </>
  );
};

export default App;
