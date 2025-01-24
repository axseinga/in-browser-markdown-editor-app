import { useMemo, useState } from "react";
import { Nav } from "./components/nav";
import { SidebarMenu } from "./components/sidebar-menu";
import { useAppState } from "./state/app-state";
import { useFetchMarkdownCollection } from "@/services/api/use-fetch-markdown-collection";
import { welcomeFile } from "./data";
import { Modal } from "./components/modal";
import { Loader } from "./components/loader";
import { DeleteConfirmationModalBody } from "./containers/delete-confirmation-modal-body";
import { LoginModalBody } from "./containers/login-modal-body";
import { MarkdownEditor } from "./containers/markdown-editor";

const App = () => {
  const { error, loading } = useFetchMarkdownCollection();
  const { showSidebar, showMarkdown, activeFileID, markdownItems } =
    useAppState();
  const [dialogId, setDialogId] = useState<"login" | "deleteAction">("login");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeFile = useMemo(() => {
    return (
      markdownItems.find((file) => file.sys.id === activeFileID) ?? welcomeFile
    );
  }, [markdownItems, activeFileID]);

  // if (loading) return <Loader />;

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
          <MarkdownEditor showMarkdown={showMarkdown} activeFile={activeFile}/>
        </div>
      </div>
      <Modal
        isOpen={isDialogOpen}
        setIsModalOpen={setIsDialogOpen}
        id="delete-dialog"
      >
        {dialogId === "login" ? (
          <LoginModalBody setIsModalOpen={setIsDialogOpen} />
        ) : (
          <DeleteConfirmationModalBody
            setIsModalOpen={setIsDialogOpen}
            fileName={activeFile.name}
          />
        )}
      </Modal>
    </>
  );
};

export default App;
