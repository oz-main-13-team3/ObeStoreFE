import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  useWishlistStore,
} from '@/features/wishlist';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth';

export function useSyncWishlist() {
  const { access } = useAuthStore();
  const setWishlist = useWishlistStore((state) => state.setWishlist);

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    enabled: !!access,
  });

  useEffect(() => {
    if (wishlist) {
      const products = wishlist.map((item) => item.product);
      setWishlist(products);
    }
  }, [wishlist, setWishlist]);

  return { isLoading };
}

export function useWishlistMutations() {
  const queryClient = useQueryClient();

  const invalidateWishlist = () => {
    queryClient.invalidateQueries({ queryKey: ['wishlist'] });
  };

  const add = useMutation({
    mutationFn: (productId: number) => addToWishlist(productId),
    onSuccess: invalidateWishlist,
  });

  const remove = useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: invalidateWishlist,
  });

  return { add, remove };
}
