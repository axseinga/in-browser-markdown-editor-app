import { welcomeFile } from "@/data";
import { MarkdownItemT, UserT } from "@/types";
import { create } from "zustand";

type AppStateT = {
  user: UserT | null;
  setUser: (user: UserT | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  showMarkdown: boolean;
  toggleShowMarkdown: () => void;
  showSidebar: boolean;
  toggleSidebar: () => void;
  activeFileID: string;
  setActiveFileID: (activeFileID: string) => void;
  markdownItems: MarkdownItemT[];
  setMarkdownItems: (markdownItems: MarkdownItemT[]) => void;
  addMarkdownItem: (item: MarkdownItemT) => void;
  updateMarkdownItem: (id: string, item: MarkdownItemT) => void;
  deleteMarkdownItem: (id: string) => void;
  editingContent: string;
  setEditingContent: (content: string) => void;
};

export const useAppState = create<AppStateT>()((set) => {
  return {
    user: null,
    setUser: (user) => set({ user }),
    theme: "light",
    setTheme: (theme) => set({ theme }),
    showMarkdown: true,
    toggleShowMarkdown: () =>
      set((state) => ({ showMarkdown: !state.showMarkdown })),
    showSidebar: false,
    toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
    activeFileID: welcomeFile.sys.id,
    setActiveFileID: (activeFileID) => set({ activeFileID }),
    markdownItems: [welcomeFile],
    setMarkdownItems: (markdownItems) => set({ markdownItems }),
    addMarkdownItem: (item) =>
      set((state) => ({ markdownItems: [...state.markdownItems, item] })),
    updateMarkdownItem: (id, item) =>
      set((state) => ({
        markdownItems: state.markdownItems.map((markdown) =>
          markdown.sys.id === id ? item : markdown,
        ),
      })),
    deleteMarkdownItem: (id) =>
      set((state) => ({
        markdownItems: state.markdownItems.filter((item) => item.sys.id !== id),
      })),
    editingContent: "",
    setEditingContent: (content) => set({ editingContent: content }),
  };
});
