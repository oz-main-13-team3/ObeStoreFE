import { useCartQuery } from '@/features/cart/api/useCartQuery';
import { useOrderStore } from '@/features/order';
import { CartCardNone } from '../cart';
import { useEffect, useState } from 'react';
import { OrderSideBar } from './OrderSideBar';
import OrderShippingCard from './OrderShippingCard';
import { useUserPointsQuery } from './api/usePointQuery';
import { ButtonBase } from '@/components/ui';

export function OrderList() {
  const { data: cartItems = [], isLoading: isLoadingCart, isError: isErrorCart } = useCartQuery();
  const { orderItems } = useOrderStore();

  const { data: point } = useUserPointsQuery();
  const [deliveryRequest, setDeliveryRequest] = useState('');
  const [availablePoints, setAvailablePoints] = useState(0);

  const totalAmountAllOrders = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const balance = Number(point?.balance ?? 0);
  useEffect(() => {
    if (balance >= 5000) {
      setAvailablePoints(balance); // 기본값을 보유 적립금 전체로
    } else {
      setAvailablePoints(0);
    }
  }, [balance]);

  const handleUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const value = Number(raw);
    setAvailablePoints(value);
  };

  const handleUsedBlur = () => {
    if (availablePoints !== 0 && availablePoints < 5000) {
      alert('최소 5000원 이상부터 사용 가능합니다!');
      setAvailablePoints(0);
      return;
    }

    if (availablePoints > balance) {
      alert('보유 적립금을 초과했습니다!');
      setAvailablePoints(balance);
      return;
    }
  };

  const isLoading = isLoadingCart;
  const isError = isErrorCart;

  const handleDeliveryRequest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeliveryRequest(e.target.value);
  };

  const handleSaveDeliveryRequest = () => {
    if (!deliveryRequest.trim()) {
      alert('배송 요청사항을 입력해주세요.');
      return;
    }

    alert('배송 요청사항이 저장되었습니다.');
  };

  if (isLoading) return <div>결제 정보를 준비 중입니다...</div>;
  if (isError || !cartItems) return <div>결제에 필요한 장바구니 정보를 찾을 수 없습니다.</div>;

  return (
    <div className='m-auto flex w-full flex-col lg:flex-row lg:justify-between'>
      <div className='w-full bg-white px-7.5 py-5 pt-10 lg:w-[calc(100%-470px)]'>
        <div className='relative px-2.5'>
          <OrderShippingCard />
          <div>
            <textarea
              placeholder='배송시 요청사항(100자 이내)'
              value={deliveryRequest}
              maxLength={100}
              onChange={handleDeliveryRequest}
              title='배송시 요청사항(100자 이내)'
              className='border-primary-500-70 text-primary-500-70 h-26 w-full resize-none rounded-lg border p-2.5'
            ></textarea>
            <ButtonBase
              className='mt-2 flex justify-self-end px-3 py-1 text-sm'
              onClick={handleSaveDeliveryRequest}
            >
              배송 요청사항 저장
            </ButtonBase>
          </div>
          <div className='border-primary-500-40 mt-6 flex items-center justify-between border-t pt-6'>
            <div className='text-primary-500-90 text-lg font-bold'>
              주문 상품 {totalAmountAllOrders}개
            </div>
          </div>
          <div>
            {orderItems.map((product) => (
              <CartCardNone
                key={product.id}
                id={String(product.id)}
                product_name={product.product_name}
                price={product.price}
                amount={product.amount}
                checked={product.checked}
                cart={product.cart}
                product_card_image={product.product_card_image}
              />
            ))}
          </div>
          <div className='pb-10'>
            <ul>
              <li className='text-primary-500-90 mt-5 text-lg font-bold'>
                보유 적립금: {balance.toLocaleString()}원
              </li>
              <li>
                {balance < 5000 ? (
                  <input
                    type='text'
                    value={availablePoints}
                    onChange={handleUsedChange}
                    className='border-custom-gray-20 bg-custom-gray-50 mt-5 w-full rounded-lg border p-2.5'
                    disabled
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                  />
                ) : (
                  <input
                    type='text'
                    value={availablePoints}
                    onChange={handleUsedChange}
                    className='input mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                    onBlur={handleUsedBlur}
                  />
                )}
              </li>
            </ul>
          </div>
          <div className='border-primary-500-40 mt-6 border-t pt-6 pb-10'>
            <div className='text-primary-500-90 text-lg font-bold'>결제 수단</div>
          </div>
        </div>
      </div>
      <OrderSideBar deliveryRequest={deliveryRequest} usedPoints={availablePoints} />
    </div>
  );
}
