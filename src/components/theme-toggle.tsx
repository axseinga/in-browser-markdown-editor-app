import { useEffect, useState } from "react";
import { useAppState } from "@/state/app-state";
import { IconDarkMode } from "./icons/icon-dark-mode";
import { IconLightMode } from "./icons/icon-light-mode";

type ThemeToggleProps = {
  id: string;
};

export const ThemeToggle = ({ id }: ThemeToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (userPrefersDark) {
      setIsChecked(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    const theme = isChecked ? "light" : "dark";

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    useAppState.getState().setTheme(theme);
  };

  return (
    <div className="flex items-center gap-3">
      <IconDarkMode color={isChecked ? "#5A6069" : "#FFFFFF"} />
      <label htmlFor={id} className="inline-flex cursor-pointer items-center">
        <span id={`label-${id}`} className="sr-only">
          "Light/Dark theme switch
        </span>
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={isChecked}
          onChange={handleChange}
          aria-checked={isChecked}
          aria-labelledby={`label-${id}`}
          className="peer sr-only"
          title="Toggle light/dark theme"
        />
        <div className="bg-customGrey-600 peer-checked:bg-customGrey-600 peer relative h-5 w-10 rounded-full after:absolute after:bottom-[4px] after:left-[4px] after:top-[4px] after:h-[12px] after:w-[12px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-[20px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-customOrange rtl:peer-checked:after:translate-x-[-20px]"></div>
      </label>
      <IconLightMode color={isChecked ? "#FFFFFF" : "#5A6069"} />
    </div>
  );
};
