// src/features/order/api/useOrders.ts
import { backendAPI } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ===============================
// 📌 1) GET /orders/ 모든 주문 조회
// ===============================

export interface Preview {
  subtotal: number;
  discount_amount: number;
  used_point: number;
  delivery_amount: number;
  total_payment: number;
  expected_point: number;
  available_point: number;
}

export const fetchOrders = async (): Promise<Preview> => {
  const response = await backendAPI.post('/orders/preview/');
  return response.data;
};

export const useOrdersQuery = () =>
  useQuery<Preview>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });

// ===============================
// 📌 2) POST /orders/ 주문 생성
// ===============================
export interface CreateOrderPayload {
  delivery_post?: number;
  used_point?: number;
  discount_amount?: number;
  delivery_amount?: number;
  delivery_request: string;

  subtotal?: number;
  total_payment?: number;
  order_items?: {
    product: number;
    amount: number;
    price: number;
  }[];
}
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      console.log('📤 [POST] /orders/', payload);
      const res = await backendAPI.post('/orders/', payload);
      return res.data;
    },
    onSuccess: () => {
      console.log('🎉 주문 생성 성공!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
