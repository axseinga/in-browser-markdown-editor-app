import { create } from "zustand";

type AppStateT = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  showMarkdown: boolean;
  toggleShowMarkdown: () => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
};

export const useAppState = create<AppStateT>()((set) => {
  return {
    theme: "light",
    setTheme: (theme) => set({ theme }),
    showMarkdown: true,
    toggleShowMarkdown: () =>
      set((state) => ({ showMarkdown: !state.showMarkdown })),
    showSidebar: false,
    toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
  };
});
