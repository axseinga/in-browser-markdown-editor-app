import { useAppState } from "@/state/app-state";

export const LogoutModalBody = () => {
  const { setUser, setIsDialogOpen } = useAppState((state) => state);

  const handleLogout = async () => {
    setUser(null);

    setTimeout(() => {
      setIsDialogOpen(false);
    }, 500);
  };

  return (
    <div className="flex max-w-[21.438rem] flex-col gap-6 bg-white p-6 dark:bg-customGrey-900 dark:text-customGrey-400">
      <p
        className="preview-h4 text-customGrey-700 dark:text-customGrey-400"
        id="dialog-description"
      >
        Do you want to logout?
      </p>
      <button
        onClick={handleLogout}
        className="heading-m-in-app flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
      >
        <p>Log me out</p>
      </button>
    </div>
  );
};
