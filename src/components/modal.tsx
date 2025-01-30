import { useAppState } from "@/state/app-state";
import { useCallback, useEffect, useRef } from "react";

type ModalProps = {
  children?: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const { isDialogOpen, setIsDialogOpen, dialogId } = useAppState(
    (state) => state,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseDialog = useCallback(
    (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        setIsDialogOpen(false);
        dialogRef.current.close();
      }
    },
    [setIsDialogOpen],
  );

  useEffect(() => {
    if (!dialogRef.current) return;
    const dialogElement = dialogRef.current;

    dialogElement?.addEventListener("click", (e) => handleCloseDialog(e));

    return () =>
      dialogElement?.removeEventListener("click", (e) => handleCloseDialog(e));
  }, [handleCloseDialog]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")?.[0];
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    if (body === null) return;
    if (!dialogRef.current) return;

    if (isDialogOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
      dialogRef.current.showModal();
    } else {
      body.style.overflow = "auto";
      body.style.paddingRight = `0px`;
      dialogRef.current.close();
    }

    return () => {
      body.style.overflow = "auto";
      body.style.paddingRight = `0px`;
    };
  }, [isDialogOpen]);

  return (
    <dialog
      role="dialog"
      id={`${dialogId}_modal`}
      aria-modal={isDialogOpen ? "true" : "false"}
      aria-describedby="dialog-description"
      className="fixed left-0 top-0 m-auto rounded-md backdrop:bg-[rgba(0,0,0,0.7)] dark:backdrop:bg-[rgba(62,62,62,0.7)]"
      ref={dialogRef}
      onClose={() => setIsDialogOpen(false)}
    >
      {children}
    </dialog>
  );
};
