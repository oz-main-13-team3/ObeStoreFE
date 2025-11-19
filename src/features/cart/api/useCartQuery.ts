import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { CartItem } from '@/types';
import { backendAPI } from '@/api';

const fetchCart = async (): Promise<CartItem[]> => {
  const { data } = await backendAPI.get('/carts/');
  console.log(data);
  if (!Array.isArray(data) || data.length === 0) return [];
  return data[0].items ?? [];
};

const deleteCartItem = async (id: number) => {
  await backendAPI.delete(`/carts/items/${id}/`);
  console.log(`${id}`);
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
