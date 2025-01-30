import { IconDelete } from "@/components/icons/icon-delete";
import { welcomeFile } from "@/data";
import { useAppState } from "@/state/app-state";
import { DialogIdEnum } from "@/types";

type DeleteFileButtonProps = {
  fileId: string;
};

export const DeleteFileButton = ({ fileId }: DeleteFileButtonProps) => {
  const { setIsDialogOpen, setDialogId } = useAppState((state) => state);

  const handleShowDialog = () => {
    setIsDialogOpen(true);
    setDialogId(DialogIdEnum.DELETE_ACTION);
  };

  return (
    <button
      aria-label="Delete file"
      onClick={handleShowDialog}
      className={`${fileId === welcomeFile.sys.id ? "cursor-not-allowed" : ""}`}
      disabled={fileId === welcomeFile.sys.id}
    >
      <IconDelete disabled={fileId === welcomeFile.sys.id} />
    </button>
  );
};
