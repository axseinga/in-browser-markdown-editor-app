import { useCallback, useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  children?: React.ReactNode;
};

export const Modal = ({ isOpen, setIsModalOpen, id, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleCloseDialogEvent = useCallback(
    (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        setIsModalOpen(false);
        dialogRef.current.close();
      }
    },
    [setIsModalOpen],
  );

  useEffect(() => {
    if (!dialogRef.current) return;
    const dialogElement = dialogRef.current;

    dialogElement?.addEventListener("click", (e) => handleCloseDialogEvent(e));

    return () =>
      dialogElement?.removeEventListener("click", (e) =>
        handleCloseDialogEvent(e),
      );
  }, [handleCloseDialogEvent]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")?.[0];
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    if (body === null) return;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "auto";
      body.style.paddingRight = `0px`;
    }

    return () => {
      body.style.overflow = "auto";
      body.style.paddingRight = `0px`;
    };
  }, [isOpen]);

  return (
    <dialog
      role="dialog"
      id={id}
      aria-modal={isOpen ? "true" : "false"}
      aria-describedby="dialog-description"
      className="fixed left-0 top-0 m-auto rounded-md backdrop:bg-[rgba(0,0,0,0.7)]"
      ref={dialogRef}
      onClose={() => setIsModalOpen(false)}
    >
      {children}
    </dialog>
  );
};
