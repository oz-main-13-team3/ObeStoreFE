import { backendAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';

export interface CartPreview {
  id: number;
  product_name: string;
  price: number;
  total_price: number;
  created_at: number;
  updated_at: number;
  amount: number;
  cart: number;
  product: number;
  product_card_image: string;
}

const fetchPreview = async (amount: number, product: number): Promise<CartPreview> => {
  const res = await backendAPI.post('/carts/items/', { amount, product });
  return res.data;
};

export const useCartPreviewQuery = (amount: number, product: number) =>
  useQuery<CartPreview>({
    queryKey: ['cart-preview', amount, product],
    queryFn: () => fetchPreview(amount, product),
    placeholderData: (prev) => prev,
    staleTime: 0,
  });
