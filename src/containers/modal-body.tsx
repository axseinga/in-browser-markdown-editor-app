import { DeleteConfirmationModalBody } from "@/containers/delete-confirmation-modal-body";
import { LoginModalBody } from "@/containers/login-modal-body";
import { LogoutModalBody } from "@/containers/logout-modal-body";
import { SaveChangesSuccessModalBody } from "@/containers/save-changes-success-modal-body";
import { useAppState } from "@/state/app-state";
import { DialogIdEnum } from "@/types";

type ModalBodyProps = {
  activeFileName: string;
};

export const ModalBody = ({ activeFileName }: ModalBodyProps) => {
  const { dialogId } = useAppState((state) => state);

  const getModalBody = (id: string) => {
    switch (id) {
      case DialogIdEnum.LOGIN_ACTION:
        return <LoginModalBody />;
      case DialogIdEnum.LOGOUT_ACTION:
        return <LogoutModalBody />;
      case DialogIdEnum.DELETE_ACTION:
        return <DeleteConfirmationModalBody fileName={activeFileName} />;
      case DialogIdEnum.SAVE_ACTION:
        return <SaveChangesSuccessModalBody fileName={activeFileName} />;
      default:
        return null;
    }
  };
  return <>{getModalBody(dialogId)}</>;
};
