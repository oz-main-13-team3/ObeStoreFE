import { create } from 'zustand';
import type { ProductCardType } from '@/types';

interface FavoriteState {
  favoriteProducts: ProductCardType[];
  setFavorites: (products: ProductCardType[]) => void;
  toggleFavorite: (product: ProductCardType) => Promise<void>;
  syncWithBackend: () => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteProducts: [],
  
  setFavorites: (products) => {
    set({ favoriteProducts: products });
  },
  
  toggleFavorite: async (product) => {
    const { favoriteProducts } = get();
    const isFavorited = favoriteProducts.some((p) => p.id === product.id);
    
    try {
      if (isFavorited) {
        await fetch(`/api/products/${product.id}/wish`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        set({
          favoriteProducts: favoriteProducts.filter((p) => p.id !== product.id)
        });
      } else {

        await fetch(`/api/products/${product.id}/wish`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        set({ favoriteProducts: [...favoriteProducts, product] });
      }
    } catch (error) {
      console.error('찜 토글 실패:', error);
      throw error;
    }
  },
  
  syncWithBackend: async () => {
    try {
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        set({ favoriteProducts: data });
      }
    } catch (error) {
      console.error('찜 목록 동기화 실패:', error);
    }
  },
}));