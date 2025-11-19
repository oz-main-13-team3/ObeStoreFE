import type { ProductCardType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistState = {
  wishlistProducts: ProductCardType[];
  setWishlist: (products: ProductCardType[]) => void;
  reset: () => void;
};

const initialState = {
  wishlistProducts: [],
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      ...initialState,
      setWishlist: (products) => set({ wishlistProducts: products }),
      reset: () => {
        set(initialState);
        localStorage.removeItem('wishlist-storage');
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        wishlistProducts: state.wishlistProducts,
      }),
    }
  )
);
