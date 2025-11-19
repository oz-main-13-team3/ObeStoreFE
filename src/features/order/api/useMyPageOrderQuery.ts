import { useQuery } from '@tanstack/react-query';
import { getOrders, getOrderDetail } from './OrderAPI';

export const useMyPageOrders = (status?: string) => {
  return useQuery({
    queryKey: ['myPageOrders', status],
    queryFn: () => getOrders(status),
    staleTime: 1000*60*5,
  });
};

export const useMyPageOrderDetail = (orderId: number) => {
  return useQuery({
    queryKey: ['myPageOrderDetail', orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
    staleTime: 1000*60*5,
  });
};