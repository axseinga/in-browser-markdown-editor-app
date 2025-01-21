import { useAppState } from "@/state/app-state";

export const HambugerMenu = () => {
  const { showSidebar } = useAppState();
  return (
    <button
      className="flex h-14 w-14 items-center justify-center bg-customGrey-700 transition-colors duration-300 hover:bg-customOrange sm:h-[72px] sm:w-[72px]"
      onClick={() => useAppState.getState().toggleSidebar()}
      aria-label="Toggle Menu"
    >
      <div className="group relative flex h-[14px] w-[23px] flex-col items-center justify-between">
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            showSidebar
              ? "w-[23px] translate-y-[6px] rotate-45 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            showSidebar
              ? "w-[23px] opacity-0 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            showSidebar
              ? "w-[23px] -translate-y-[6px] -rotate-45 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
      </div>
    </button>
  );
};
