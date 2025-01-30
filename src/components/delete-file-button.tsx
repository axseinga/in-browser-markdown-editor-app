import { IconDelete } from "@/components/icons/icon-delete";
import { welcomeFile } from "@/data";
import { DialogT } from "@/types";

type DeleteFileButtonProps = {
  fileId: string;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogId: (id: DialogT) => void;
};

export const DeleteFileButton = ({
  fileId,
  setIsDialogOpen,
  setDialogId,
}: DeleteFileButtonProps) => {
  return (
    <button
      aria-label="Delete file"
      onClick={() => {
        setIsDialogOpen(true);
        setDialogId("deleteAction");
      }}
      className={`${fileId === welcomeFile.sys.id ? "cursor-not-allowed" : ""}`}
      disabled={fileId === welcomeFile.sys.id}
    >
      <IconDelete disabled={fileId === welcomeFile.sys.id} />
    </button>
  );
};
