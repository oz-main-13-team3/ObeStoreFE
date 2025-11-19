import { create } from 'zustand';

type ToggleState = {
  isMenuOpen: boolean;
  isSortOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openSort: () => void;
  closeSort: () => void;
  toggleSort: () => void;
};

export const useToggleStore = create<ToggleState>((set) => ({
  isMenuOpen: false,
  isSortOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openSort: () => set({ isSortOpen: true }),
  closeSort: () => set({ isSortOpen: false }),
  toggleSort: () => set((state) => ({ isSortOpen: !state.isSortOpen })),
}));
