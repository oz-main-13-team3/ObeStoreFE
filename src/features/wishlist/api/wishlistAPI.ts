import { backendAPI } from '@/api';
import type { ProductCardType } from '@/types';

export interface WishlistItemType {
  id: number;
  product: ProductCardType;
}

export const getWishlist = async (): Promise<WishlistItemType[]> => {
  const response = await backendAPI.get('/users/me/wishlist/');
  console.log(response.data);
  return response.data;
};

export const addToWishlist = async (productId: number) => {
  const response = await backendAPI.post('/users/me/wishlist/', { product_id: productId });
  return response.data;
};

export const removeFromWishlist = async (wishlistItemId: number) => {
  const response = await backendAPI.delete(`/users/me/wishlist/${wishlistItemId}`);
  return response.data;
};
