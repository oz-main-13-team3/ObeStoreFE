import { useNavigate } from 'react-router-dom';
import { ORDER_STATUS_LABEL, type Order } from '@/types/order';
import { useState } from 'react';

interface Props { 
  order: Order; 
}

export default function MyPageOrderCard({ order }: Props) {
  const navigate = useNavigate();
  const firstItem = order.order_products_detail[0];
  const additionalCount = order.order_products_detail.length - 1;
  const [imageError, setImageError] = useState(false);

  const handleDetailClick = () => {
    navigate(`/users/orders/${order.id}`);
  };

  const imageUrl = firstItem.product_image && !imageError
    ? firstItem.product_image 
    : 'https://via.placeholder.com/150?text=No+Image';

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-stone-500 mb-1">
            {new Date(order.created_at).toLocaleDateString('ko-KR')}
          </div>
          <div className="text-xs text-stone-400">
            주문번호: {order.order_number}
          </div>
        </div>
        <div className="px-3 py-1 bg-stone-100 rounded text-sm font-medium">
          {ORDER_STATUS_LABEL[order.order_status] || order.order_status}
        </div>
      </div>

      <div className="flex gap-4">
        <img
          src={imageUrl}
          alt={firstItem.product_name}
          className="w-24 h-24 object-cover rounded bg-stone-100"
          onError={handleImageError}
        />
        <div className="flex-1">
          <div className="font-medium mb-1">
            {firstItem.product_name}
            {additionalCount > 0 && (
              <span className="text-stone-500 text-sm ml-2">
                외 {additionalCount}개
              </span>
            )}
          </div>
          <div className="text-sm text-stone-600">
            {firstItem.amount}개 · {firstItem.price.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div className="text-lg font-semibold">
          결제 금액 {order.total_payment.toLocaleString()}원
        </div>
        <button
          onClick={handleDetailClick}
          className="px-4 py-2 border border-stone-300 rounded hover:bg-stone-50 transition-colors">
          주문 상세
        </button>
      </div>
    </div>
  );
}