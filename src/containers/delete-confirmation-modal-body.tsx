import { deleteMarkdown } from "@/services/api/delete-markdown";
import { useAppState } from "@/state/app-state";

type DeleteConfirmationModalBodyProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  fileName: string;
};

export const DeleteConfirmationModalBody = ({
  setIsModalOpen,
  fileName,
}: DeleteConfirmationModalBodyProps) => {
  const { activeFileID } = useAppState();

  const handleDeleteDocument = async (id: string) => {
    useAppState.getState().deleteMarkdownItem(activeFileID);
    await deleteMarkdown(id);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6">
      <p className="preview-h4 text-customGrey-700" id="dialog-description">
        Delete this document?
      </p>
      <p className="preview-paragraph text-customGrey-500">
        Are you sure you want to delete the ‘{fileName}’ document and its
        contents? This action cannot be reversed.
      </p>
      <button
        onClick={() => handleDeleteDocument(activeFileID)}
        className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
      >
        <p>Confirm & Delete</p>
      </button>
    </div>
  );
};
