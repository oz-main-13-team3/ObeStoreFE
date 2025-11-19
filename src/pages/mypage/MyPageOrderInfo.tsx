import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyPageOrders } from '@/features/order/api/useMyPageOrderQuery';
import { type Order } from '@/types/order'; 
import { useAuthStore } from '@/features/auth';
import MyPageOrderCard from './MyPageOrderCard';

const ORDER_STATUS = [
  { key: 'all', label: '전체' },
  { key: 'pending', label: '결제완료' },
  { key: 'confirmed', label: '배송준비중' },
  { key: 'shipping', label: '배송중' },
  { key: 'delivered', label: '배송완료' },
  { key: 'cancelled', label: '취소/반품' },
] as const;

export default function MyPageOrderInfo() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const navigate = useNavigate();
  const { access } = useAuthStore();

  useEffect(() => {
    if (!access) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [access, navigate]);

  const { data: orders = [], isLoading, error } = useMyPageOrders(
    selectedStatus === 'all' ? undefined : selectedStatus
  );

  if (!access) {return null;}
  if (isLoading) {return <div className="p-8 text-center">주문 내역 불러오는 중</div>;}
  if (error) {return <div className="p-8 text-center text-red-600">주문 내역을 불러오지 못했습니다.</div>;}

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o: Order) => o.order_status === 'pending').length,
    confirmed: orders.filter((o: Order) => o.order_status === 'confirmed').length,
    shipping: orders.filter((o: Order) => o.order_status === 'shipping').length,
    delivered: orders.filter((o: Order) => o.order_status === 'delivered').length,
    cancelled: orders.filter((o: Order) => o.order_status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">주문 내역</h1>
        
        <div className="space-y-6">
          <div className="flex gap-4 border-b">
            {ORDER_STATUS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`pb-3 px-2 transition-colors ${
                  selectedStatus === key
                    ? 'border-b-2 border-stone-800 font-semibold'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {label} ({statusCounts[key]})
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-20 text-center text-stone-500">
                주문 내역이 없습니다.
              </div>
            ) : (
              orders.map((order: Order) => (
                <MyPageOrderCard key={order.id} order={order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}