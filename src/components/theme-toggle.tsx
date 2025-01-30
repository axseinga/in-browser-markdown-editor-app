import { useEffect, useState } from "react";
import { useAppState } from "@/state/app-state";
import { IconDarkMode } from "@/components/icons/icon-dark-mode";
import { IconLightMode } from "@/components/icons/icon-light-mode";

type ThemeToggleProps = {
  id: string;
};

export const ThemeToggle = ({ id }: ThemeToggleProps) => {
  const [isLightMode, setIsLightMode] = useState(true);
  const { setTheme } = useAppState((state) => state);

  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (userPrefersDark) {
      setIsLightMode(false);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const theme = isLightMode ? "light" : "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(theme);
  }, [isLightMode, setTheme]);

  const handleChange = () => {
    setIsLightMode((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-3">
      <IconDarkMode color={isLightMode ? "#5A6069" : "#FFFFFF"} />
      <label htmlFor={id} className="inline-flex cursor-pointer items-center">
        <span id={`label-${id}`} className="sr-only">
          Dark/light theme switch
        </span>
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={isLightMode}
          onChange={handleChange}
          aria-checked={isLightMode}
          aria-labelledby={`label-${id}`}
          className="peer sr-only"
          title="Toggle dark/light theme"
        />
        <div className="peer relative h-5 w-10 rounded-full bg-customGrey-600 after:absolute after:bottom-[4px] after:left-[4px] after:top-[4px] after:h-[12px] after:w-[12px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-customGrey-600 peer-checked:after:translate-x-[20px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-customOrange rtl:peer-checked:after:translate-x-[-20px]"></div>
      </label>
      <IconLightMode color={isLightMode ? "#FFFFFF" : "#5A6069"} />
    </div>
  );
};
