import { useDeleteDocument } from "@/hooks/use-delete-document";

type DeleteConfirmationModalBodyProps = {
  fileName: string;
};

export const DeleteConfirmationModalBody = ({
  fileName,
}: DeleteConfirmationModalBodyProps) => {
  const { deleteDocument, error, success, deletedFileName } =
    useDeleteDocument(fileName);

  return (
    <div
      className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6 dark:bg-customGrey-900"
      aria-live="polite"
    >
      {success ? (
        <SucessMessage deletedFileName={deletedFileName} />
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
            onClick={deleteDocument}
            className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
          >
            Confirm & Delete
          </button>
          {error && <ErrorMessage />}
        </>
      )}
    </div>
  );
};

const SucessMessage = ({ deletedFileName }: { deletedFileName: string }) => {
  return (
    <p className="preview-h4 text-center text-customGrey-700 dark:text-white">
      The ‘{deletedFileName}’ document has been deleted.
    </p>
  );
};

const ErrorMessage = () => {
  return (
    <p className="body-in-app mt-1 h-3 py-1 text-red-600">
      "Something went wrong. Please refresh and try again.
    </p>
  );
};
