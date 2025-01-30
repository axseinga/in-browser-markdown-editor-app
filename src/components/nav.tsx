import { HamburgerMenu } from "@/components/hamburger-menu";
import { DialogT, MarkdownItemT } from "@/types";
import { FileNameEditor } from "@/components/file-name-editor";
import { SaveFileChangesButton } from "@/components/save-file-changes-button";
import { UserNavPanel } from "@/components/user-nav-panel";
import { DeleteFileButton } from "./delete-file-button";

type NavProps = {
  activeFile: MarkdownItemT;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogId: (id: DialogT) => void;
};

export const Nav = ({ activeFile, setIsDialogOpen, setDialogId }: NavProps) => {
  return (
    <nav className="flex h-14 w-full flex-shrink-0 items-center bg-customGrey-800 text-white sm:h-[4.5rem] sm:pr-2">
      <HamburgerMenu />
      <p className="hidden border-r-[1px] border-customGrey-600 px-4 py-2 font-commissioner text-[0.938rem] font-semibold uppercase tracking-[4px] md:flex md:px-6 md:tracking-[5px]">
        Markdown
      </p>
      <div className="flex w-full items-center justify-between pl-7 pr-2">
        <FileNameEditor activeFile={activeFile} />
        <div className="flex items-center gap-4 pl-4">
          <UserNavPanel
            setIsDialogOpen={setIsDialogOpen}
            setDialogId={setDialogId}
          />
          <DeleteFileButton
            fileId={activeFile.sys.id}
            setIsDialogOpen={setIsDialogOpen}
            setDialogId={setDialogId}
          />
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
