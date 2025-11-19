import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMyPageOrderDetail } from '@/features/order/api/useMyPageOrderQuery';
import { ORDER_STATUS_LABEL } from '@/types/order';
import { useAuthStore } from '@/features/auth';

export default function MyPageOrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { access } = useAuthStore();
  const { data: order, isLoading, error } = useMyPageOrderDetail(Number(orderId));

  useEffect(() => {
    if (!access) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [access, navigate]);

  if (!access) {  return null; }
  if (isLoading) {  return <div className="p-8 text-center">주문 정보를 불러오는 중...</div>;  }
  if (error || !order) {  return <div className="p-8 text-center text-red-600">주문 정보를 불러오지 못했습니다.</div>;  }

    return (
    <div className="min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-stone-600 hover:text-stone-900 mb-6"
        >
          ← 뒤로가기
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">주문 상세 내역</h1>
          <div className="text-stone-600">
            {new Date(order.created_at).toLocaleDateString('ko-KR')}
          </div>
          <div className="text-sm text-stone-500">
            주문번호: {order.order_number}
          </div>
          <div className="mt-2">
            <span className="px-3 py-1 bg-stone-100 rounded text-sm font-medium">
              {ORDER_STATUS_LABEL[order.order_status] || order.order_status}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <section className="bg-white border border-stone-200 rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">배송지</h2>
            <div className="space-y-3 text-stone-700">
              <div className="text-base">주소 ID: {order.address}</div>
              {order.delivery_request && (
                <div className="text-sm text-stone-500">배송 요청사항: {order.delivery_request}</div>
              )}
            </div>
          </section>

          <section className="bg-white border border-stone-200 rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">주문 상품 {order.order_products_detail.length}개</h2>
            <div className="space-y-6">
              {order.order_products_detail.map((item) => (
                <div key={item.id} className="flex gap-6 pb-6 border-b last:border-b-0">
                  <img
                    src={item.product_image || '/placeholder.png'}
                    alt={item.product_name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-2">{item.product_name}</div>
                    <div className="text-base text-stone-600 mb-1">
                      {item.amount}개 · {item.price.toLocaleString()}원
                    </div>
                    <div className="text-base text-stone-500 font-medium">
                      합계: {item.total_price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-stone-200 rounded-lg p-8">
            <h2 className="text-xl font-bold mb-6">결제정보</h2>
            <div className="space-y-4 text-base">
              <div className="flex justify-between py-2">
                <span>상품 금액</span>
                <span className="font-medium">{order.subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between py-2 text-red-600">
                <span>할인 금액</span>
                <span className="font-medium">-{order.discount_amount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between py-2">
                <span>배송비</span>
                <span className="font-medium">{order.delivery_amount === 0 ? '무료배송' : `${order.delivery_amount.toLocaleString()}원`}</span>
              </div>
              <div className="flex justify-between py-2 text-blue-600">
                <span>사용 포인트</span>
                <span className="font-medium">-{order.used_point.toLocaleString()}P</span>
              </div>
              <div className="pt-4 border-t-2 flex justify-between font-bold text-xl">
                <span>결제 금액</span>
                <span>{order.total_payment.toLocaleString()}원</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}