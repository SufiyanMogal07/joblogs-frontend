import { create } from "zustand";

interface UIStore {
  isSidebarOpen: boolean;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => {

  return {
    isSidebarOpen: false,
    isMobile: false,
    setIsMobile: (value) => set({ isMobile: value }),
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
  };
});
