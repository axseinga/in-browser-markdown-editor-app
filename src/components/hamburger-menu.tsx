type HamburgerMenuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HambugerMenu = ({ isOpen, setIsOpen }: HamburgerMenuProps) => {
  return (
    <div className="bg-customGrey-700 flex h-14 w-14 items-center justify-center">
      <button
        className="group relative flex h-[14px] w-[23px] flex-col items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            isOpen
              ? "w-[23px] translate-y-[6px] rotate-45 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            isOpen
              ? "w-[23px] opacity-0 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
        <span
          className={`block h-[2px] bg-white transition-all duration-300 ${
            isOpen
              ? "w-[23px] -translate-y-[6px] -rotate-45 group-hover:bg-white"
              : "w-[23px] group-hover:bg-white"
          }`}
        ></span>
      </button>
    </div>
  );
};
