import { useQuery } from '@tanstack/react-query';
import { getOrders, getOrderDetail } from './OrderAPI';
import type { Order } from '@/types/order';

export const useMyPageOrders = (status?: string) => {
  return useQuery<Order[]>({
    queryKey: ['myPageOrders', status],
    queryFn: () => getOrders(status),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyPageOrderDetail = (orderId: number) => {
  return useQuery<Order>({
    queryKey: ['myPageOrderDetail', orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};