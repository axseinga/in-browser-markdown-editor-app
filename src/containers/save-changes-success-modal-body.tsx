import { useAppState } from "@/state/app-state";

type SaveChangesSuccessModalBodyProps = {
  fileName: string;
};

export const SaveChangesSuccessModalBody = ({
  fileName,
}: SaveChangesSuccessModalBodyProps) => {
  const { setIsDialogOpen } = useAppState((state) => state);
  
  return (
    <div className="flex max-w-[21.438rem] flex-col gap-3 bg-white p-6 dark:bg-customGrey-900">
      <p className="preview-h4 text-center text-customGrey-700 dark:text-customGrey-400">
        The ‘{fileName}’ document has been saved.
      </p>
      <button
        onClick={() => setIsDialogOpen(false)}
        className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
      >
        Close
      </button>
    </div>
  );
};
