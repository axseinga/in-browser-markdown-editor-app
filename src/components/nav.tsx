import { IconDelete } from "@/components/icons/icon-delete";
import { HambugerMenu } from "@/components/hamburger-menu";
import { DialogT, MarkdownItemT } from "@/types";
import { FileNameEditor } from "@/components/file-name-editor";
import { SaveFileChangesButton } from "@/components/save-file-changes-button";
import { UserNavPanel } from "@/components/user-nav-panel";
import { welcomeFile } from "@/data";

type NavProps = {
  activeFile: MarkdownItemT;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogId: (id: DialogT) => void;
};

export const Nav = ({ activeFile, setIsDialogOpen, setDialogId }: NavProps) => {
  return (
    <nav className="flex h-14 w-full flex-shrink-0 items-center bg-customGrey-800 text-white sm:h-[4.5rem] sm:pr-2">
      <HambugerMenu />
      <p className="hidden border-r-[1px] border-customGrey-600 px-4 py-2 font-commissioner text-[0.938rem] font-semibold uppercase tracking-[4px] md:flex md:tracking-[5px] md:px-6">
        Markdown
      </p>
      <div className="flex w-full items-center justify-between pl-7 pr-2">
        <FileNameEditor activeFile={activeFile} />
        <div className="flex items-center gap-4 pl-4">
          <UserNavPanel
            setIsDialogOpen={setIsDialogOpen}
            setDialogId={setDialogId}
          />
          <button
            aria-label="Delete file"
            onClick={() => {
              setIsDialogOpen(true);
              setDialogId("deleteAction");
            }}
            className={`${activeFile.sys.id === welcomeFile.sys.id ? "cursor-not-allowed" : ""}`}
            disabled={activeFile.sys.id === welcomeFile.sys.id}
          >
            <IconDelete disabled={activeFile.sys.id === welcomeFile.sys.id} />
          </button>
          <SaveFileChangesButton
            activeFile={activeFile}
            setDialogId={setDialogId}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </div>
    </nav>
  );
};
