import { useAppState } from "@/state/app-state";

export const HamburgerMenu = () => {
  const { showSidebar, toggleSidebar } = useAppState((state) => state);

  const renderSpan = (additionalClasses: string) => (
    <span
      className={`block h-[2px] w-[23px] bg-white transition-all duration-300 group-hover:bg-white ${additionalClasses}`}
    ></span>
  );

  return (
    <button
      className="flex h-14 w-16 items-center justify-center bg-customGrey-700 transition-colors duration-300 hover:bg-customOrange sm:h-[72px] sm:w-[92px]"
      onClick={() => toggleSidebar()}
      aria-label="Toggle Menu"
    >
      <div className="group relative flex h-[14px] w-[23px] flex-col items-center justify-between">
        {renderSpan(showSidebar ? "translate-y-[6px] rotate-45" : "")}
        {renderSpan(showSidebar ? "opacity-0" : "")}
        {renderSpan(showSidebar ? "-translate-y-[6px] -rotate-45" : "")}
      </div>
    </button>
  );
};
