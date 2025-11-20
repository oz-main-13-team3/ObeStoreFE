// PaymentButton.tsx
import React, { useState } from 'react';
import { backendAPI } from '@/api';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useCreateOrderMutation } from '@/features/order/api/useOrderQuery';

interface PaymentButtonProps {
  addressId: number;
  usedPoint: number;
  deliveryRequest?: string;
  selectedCartItemIds: number[];
  preview: {
    used_point: number;
    discount_amount: number;
    delivery_amount: number;
    subtotal: number;
    total_payment: number;
  } | null;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  addressId,
  usedPoint,
  deliveryRequest,
  selectedCartItemIds,
  preview,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { mutateAsync: createOrder } = useCreateOrderMutation();

  const handleClick = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      if (!preview) {
        setErrorMsg('주문 미리보기 정보가 없습니다.');
        return;
      }

      // ============================================
      // 1) 주문 생성
      // ============================================
      const orderData = await createOrder({
        delivery_post: addressId,
        used_point: usedPoint,
        discount_amount: preview.discount_amount,
        delivery_amount: preview.delivery_amount,
        subtotal: preview.subtotal,
        total_payment: preview.total_payment,
        order_items: selectedCartItemIds.map((id) => ({
          product: id,
          amount: 1, // 장바구니 amount가 있다면 여기로
          price: 10000, // 장바구니 item price로 교체 가능
        })),
        delivery_request: deliveryRequest ?? '', // ⭐ undefined 방지
      });

      const order_id = orderData?.order_id;
      if (!order_id) throw new Error('order_id를 받아오지 못했습니다.');

      // ============================================
      // 2) 결제 준비 API 호출
      // ============================================
      const paymentRes = await backendAPI.post('/payments/', { order_id });

      console.log('📦 결제 준비 API 응답:', paymentRes.data);

      const {
        orderId,
        amount,
        orderName,
        clientKey,
        successUrl,
        failUrl,
        customerEmail,
        customerName,
        customerMobilePhone,
      } = paymentRes.data;

      console.log('orderId:', orderId); // orderId 확인

      if (!clientKey) throw new Error('clientKey가 존재하지 않습니다.');

      // ============================================
      // 3) Toss 결제창 실행
      // ============================================

      const tossPayments = await loadTossPayments(clientKey);
      const cleanPhone = (customerMobilePhone || '').replace(/\D/g, '');
      await tossPayments.requestPayment('TOSSPAY', {
        amount,
        orderId,
        orderName,
        successUrl,
        failUrl,
        customerEmail,
        customerName,
        customerMobilePhone: cleanPhone,
      });
    } catch (error: any) {
      console.error('❌ PAYMENT ERROR:', error);

      const serverMsg =
        error?.response?.data?.detail ||
        error?.response?.data?.used_point ||
        error?.response?.data?.address ||
        '결제 처리 중 문제가 발생했습니다.';

      setErrorMsg(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className='btn btn-primary mt-6 w-full rounded-lg px-4 py-2 font-medium transition'
      >
        {loading ? '결제 준비 중...' : '결제하기'}
      </button>
      {errorMsg && <p style={{ color: 'red', marginTop: '8px' }}>⚠️ {errorMsg}</p>}
    </div>
  );
};

export default PaymentButton;
