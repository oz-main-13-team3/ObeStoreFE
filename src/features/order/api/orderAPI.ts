import backendAPI from '@/api/backendAPI';
import type { Order } from '@/types/order';

export const getOrders = async (status?: string): Promise<Order[]> => {
  const params = status ? { order_status: status } : {};
  const response = await backendAPI.get('/orders', { params });
  return response.data;
};

export const getOrderDetail = async (orderId: number): Promise<Order> => {
  const response = await backendAPI.get(`/orders/${orderId}`);
  return response.data;
};