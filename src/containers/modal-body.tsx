import { DeleteConfirmationModalBody } from "@/containers/delete-confirmation-modal-body";
import { LoginModalBody } from "@/containers/login-modal-body";
import { LogoutModalBody } from "@/containers/logout-modal-body";
import { SaveChangesSuccessModalBody } from "@/containers/save-changes-success-modal-body";
import { DialogT } from "@/types";

type ModalBodyProps = {
  dialogId: DialogT;
  setIsDialogOpen: (isOpen: boolean) => void;
  activeFileName: string;
};

export const ModalBody = ({
  dialogId,
  setIsDialogOpen,
  activeFileName,
}: ModalBodyProps) => {
  const getModalBody = (id: string) => {
    switch (id) {
      case "login":
        return <LoginModalBody setIsModalOpen={setIsDialogOpen} />;
      case "logout":
        return <LogoutModalBody setIsModalOpen={setIsDialogOpen} />;
      case "deleteAction":
        return (
          <DeleteConfirmationModalBody
            setIsModalOpen={setIsDialogOpen}
            fileName={activeFileName}
          />
        );
      case "saveAction":
        return (
          <SaveChangesSuccessModalBody
            setIsModalOpen={setIsDialogOpen}
            fileName={activeFileName}
          />
        );
      default:
        return null;
    }
  };
  return <>{getModalBody(dialogId)}</>;
};
