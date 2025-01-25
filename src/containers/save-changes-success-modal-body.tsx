type SaveChangesSuccessModalBodyProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  fileName: string;
};

export const SaveChangesSuccessModalBody = ({
  setIsModalOpen,
  fileName,
}: SaveChangesSuccessModalBodyProps) => {
  return (
    <div className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6">
      <p className="preview-h4 text-center text-customGrey-700">
        The ‘{fileName}’ document has been saved.
      </p>
      <button
        onClick={() => setIsModalOpen(false)}
        className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
      >
        Close
      </button>
    </div>
  );
};
