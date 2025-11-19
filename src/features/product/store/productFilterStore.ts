import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductFilterState {
  sort: string;
  setSort: (sort: string) => void;
}

export const useProductFilterStore = create<ProductFilterState>()(
  persist(
    (set) => ({
      sort: '',
      setSort: (sort) => set({ sort }),
    }),
    { name: 'product-filter' }
  )
);
