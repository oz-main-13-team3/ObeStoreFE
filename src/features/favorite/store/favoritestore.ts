import type { ProductCardType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteState = {
  favoriteProducts: ProductCardType[];
  toggleFavorite: (product: ProductCardType) => Promise<void>;
  syncWithBackend: () => Promise<void>;
  reset: () => void;
};

const initialState = {
  favoriteProducts: [],
};

const API_BASE_URL = 'http://localhost:8000';

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      toggleFavorite: async (product) => {
        const { favoriteProducts } = get();
        const isFavorited = favoriteProducts.some((p) => p.id === product.id);

        set((state) => ({
          favoriteProducts: state.favoriteProducts.some((p) => p.id === product.id)
            ? state.favoriteProducts.filter((p) => p.id !== product.id)
            : [...state.favoriteProducts, product],
        }));
        
        try {
          const endpoint = `${API_BASE_URL}/api/products/${product.id}/wish`;
          const method = isFavorited ? 'DELETE' : 'POST';
          
          console.log(`API 호출: ${method} ${endpoint}`);
          
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (!response.ok) {
            console.error('API 호출 실패:', response.status, response.statusText);
          } else {
            console.log('API 호출 성공');
          }
        } catch (error) {
          console.error('찜 API 호출 실패:', error);
        }
      },
      
      syncWithBackend: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/favorites`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log('백엔드에서 받은 찜 목록:', data);
            set({ favoriteProducts: data });
          } else {
            console.error('찜 목록 동기화 실패:', response.status);
          }
        } catch (error) {
          console.error('찜 목록 동기화 실패:', error);
        }
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'favorite-storage',
      partialize: (state) => ({
        favoriteProducts: state.favoriteProducts,
      }),
    }
  )
);