import { deleteMarkdown } from "@/services/api/markdown/delete-markdown";
import { useAppState } from "@/state/app-state";
import { useEffect, useState } from "react";

type DeleteConfirmationModalBodyProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  fileName: string;
};

export const DeleteConfirmationModalBody = ({
  setIsModalOpen,
  fileName,
}: DeleteConfirmationModalBodyProps) => {
  const {
    activeFileID,
    markdownItems,
    user,
    deleteMarkdownItem,
    setActiveFileID,
  } = useAppState((state) => state);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deletedFileName, setDeletedFileName] = useState(fileName);

  const handleDeleteDocument = async (id: string) => {
    try {
      setDeletedFileName(fileName);
      deleteMarkdownItem(activeFileID);

      if (user) {
        await deleteMarkdown({ markdownId: id });
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setActiveFileID(markdownItems[0].sys.id);
        setIsModalOpen(false);
        setSuccess(false);
      }, 2000);
    }
  }, [success, setIsModalOpen, markdownItems, setActiveFileID]);

  return (
    <div
      className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6 dark:bg-customGrey-900"
      aria-live="polite"
    >
      {success ? (
        <p className="preview-h4 text-center text-customGrey-700 dark:text-white">
          The ‘{deletedFileName}’ document has been deleted.
        </p>
      ) : (
        <>
          <p
            className="preview-h4 text-customGrey-700 dark:text-white"
            id="dialog-description"
          >
            Delete this document?
          </p>
          <p className="preview-paragraph text-customGrey-500 dark:text-customGrey-400">
            Are you sure you want to delete the{" "}
            <span className="font-semibold">‘{deletedFileName}’</span> document
            and its contents? This action cannot be reversed.
          </p>
          <button
            onClick={() => handleDeleteDocument(activeFileID)}
            className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
          >
            Confirm & Delete
          </button>
          {error && (
            <p className="body-in-app mt-1 h-3 py-1 text-red-600">{error}</p>
          )}
        </>
      )}
    </div>
  );
};
