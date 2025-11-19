import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import type { CartItem } from '@/types';
import { backendAPI } from '@/api';

interface CartResponse {
  id: number;
  items: CartItem[];
  price: number;
  total_price: number;
  user: number;
  subtotal?: number;
}

const fetchCart = async (): Promise<CartItem[]> => {
  const response: AxiosResponse<CartResponse> = await backendAPI.get('/carts');
  const carts = response.data;

  if (!Array.isArray(carts) || carts.length === 0) return [];

  return carts[0].items ?? [];
};

const deleteCartItem = async (id: number) => {
  await backendAPI.delete(`/carts/items/${id}/`);
};

export const useCartQuery = () => {
  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
