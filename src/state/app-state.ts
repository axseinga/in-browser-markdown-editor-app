import { create } from "zustand";

type AppStateT = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const useAppState = create<AppStateT>()((set) => {
  return {
    theme: "light",
    setTheme: (theme) => set({ theme }),
  };
});
