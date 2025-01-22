import { useCallback, useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
};

export const Modal = ({ isOpen, setIsModalOpen, id }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handleDeleteDocument = () => {
    // @todo add deleting document logic here

    setIsModalOpen(false);
  };

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
      <div className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6">
        <p className="preview-h4 text-customGrey-700" id="dialog-description">
          Delete this document?
        </p>
        <p className="preview-paragraph text-customGrey-500">
          Are you sure you want to delete the ‘welcome.md’ document and its
          contents? This action cannot be reversed.
        </p>
        <button
          onClick={() => handleDeleteDocument()}
          className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
        >
          <p>Confirm & Delete</p>
        </button>
      </div>
    </dialog>
  );
};
