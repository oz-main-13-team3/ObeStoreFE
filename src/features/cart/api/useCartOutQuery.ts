import { useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import type { CartItem } from '@/types';
import { backendAPI } from '@/api';

interface CartOustResponse {
  id: number;
  items: CartItem[];
  price: number;
  total_price: number;
  user: number;
  subtotal?: number;
  discount_amount?: number;
  delivery_amount?: number;
  total_payment?: number;
  created_at?: string;
  updated_at?: string;
}

// 카트의 아이템 배열과 다른 메타 정보 반환
const fetchCartOut = async (): Promise<{
  items: CartItem[];
  subtotal: number;
  discount_amount: number;
  delivery_amount: number;
  price: number;
  total_price: number;
  user: number;
}> => {
  const response: AxiosResponse<CartOustResponse[]> = await backendAPI.get('/carts');
  const carts = response.data;

  // 카트가 없으면 빈 배열과 기본값 반환
  if (!Array.isArray(carts) || carts.length === 0) {
    return {
      items: [],
      subtotal: 0,
      discount_amount: 0,
      delivery_amount: 0,
      price: 0,
      total_price: 0,
      user: 0,
    };
  }

  // 첫 번째 카트의 items 배열과 다른 메타 정보를 반환
  const cart = carts[0]; // 첫 번째 카트
  return {
    items: cart.items ?? [], // 아이템 배열
    subtotal: cart.subtotal ?? 0, // 소계
    discount_amount: cart.discount_amount ?? 0, // 할인액
    delivery_amount: cart.delivery_amount ?? 0, // 배송비
    price: cart.price ?? 0, // 가격
    total_price: cart.total_price ?? 0, // 총 가격
    user: cart.user ?? 0, // 유저 ID
  };
};

export const useCartOutQuery = () => {
  return useQuery({
    queryKey: ['cartOut'],
    queryFn: fetchCartOut,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
