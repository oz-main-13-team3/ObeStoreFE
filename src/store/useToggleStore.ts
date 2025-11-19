import { create } from 'zustand';

type ToggleState = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openSort: () => void;
  closeSort: () => void;
  toggleSort: () => void;
};

export const useToggleStore = create<ToggleState>((set) => ({
  isOpen: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  openSort: () => set({ isOpen: true }),
  closeSort: () => set({ isOpen: false }),
  toggleSort: () => set((state) => ({ isOpen: !state.isOpen })),
}));
