import { CartCard, CartSideBar, useCartQuery } from '@/features/cart';
import { CheckBox, ButtonBase } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CartList() {
  const { data: cartItems = [], isLoading, isError } = useCartQuery();
  console.log('cart data', cartItems);
  // const { data: cartOutItems = null } = useCartOutQuery();
  // console.log('c data', cartOutItems);

  const navigate = useNavigate();

  // 선택된 아이템을 추적하기 위한 상태
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // selectedItems는 선택된 item의 id들을 추적합니다
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

  // 전체 선택/해제 처리
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      // 모든 항목을 선택
      setSelectedItems(cartItems.map((item) => Number(item.id)));
    } else {
      // 모든 항목을 선택 해제
      setSelectedItems([]);
    }
  };

  // 개별 항목 선택 처리
  const handleItemCheck = (id: number, checked: boolean) => {
    if (checked) {
      // 선택한 항목 id를 추가
      setSelectedItems((prev) => [...prev, id]);
    } else {
      // 선택 해제된 항목 id를 제거
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // 선택된 항목 삭제
  const removeCheckedItems = () => {
    setSelectedItems([]); // 선택된 항목 삭제 후, 상태 초기화
  };

  useEffect(() => {
    if (selectedItems.length === cartItems.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, cartItems]);

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + Number(item.price) * Number(item.amount), 0); // item.price와 item.amount를 Number()로 변환
  };

  const calculateTotalDiscount = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (acc, item) =>
          acc + (item.discount_amount ? Number(item.discount_amount) * Number(item.amount) : 0), // discount_amount가 없을 경우 0으로 처리하고 Number()로 변환
        0
      );
  };

  const calculateShippingFee = (totalPrice: number) => {
    if (selectedItems.length === 0) return 0; // 선택된 상품이 없으면 배송비 없음
    if (totalPrice >= 50000) return 0; // 금액이 50,000원 이상이면 무료배송
    return 3500; // 그 외는 3,500원
  };

  // 적립금 계산 (상품 금액의 1%)
  const calculateTotalRewardPoints = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + Number(item.price) * Number(item.amount) * 0.01, 0); // 상품 금액의 1%
  };

  const totalPrice = calculateTotalPrice();
  const totalDiscount = calculateTotalDiscount();
  const shippingFee = calculateShippingFee(totalPrice);
  const totalRewardPoints = calculateTotalRewardPoints();

  // 결제 진행
  const handlePurchase = () => {
    navigate('/order/order');
  };

  const finalAmount = totalPrice - totalDiscount + shippingFee;

  if (isLoading) return <div>장바구니 정보를 불러오는 중입니다...</div>;
  if (isError) return <div>장바구니를 불러오지 못했습니다.</div>;

  return (
    <div className='m-auto flex w-full flex-col lg:flex-row lg:justify-between'>
      <div className='w-full bg-white px-7.5 py-5 lg:w-[calc(100%-470px)]'>
        <div className='flex justify-between py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputMargin='mr-4'
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='pdr-3 text-base'
          />
          <ButtonBase onClick={removeCheckedItems} variant='gnb'>
            선택 삭제
          </ButtonBase>
        </div>

        {cartItems.map((product) => (
          <CartCard
            key={product.id}
            id={String(product.id)}
            product_name={product.product_name}
            price={product.price}
            product_card_image={
              typeof product.product_card_image === 'string'
                ? product.product_card_image
                : Array.isArray(product.product_card_image)
                  ? product.product_card_image[0]
                  : 'http://placehold.co/200x200'
            }
            amount={product.amount}
            checked={selectedItems.includes(product.id)}
            cart={product.cart}
            onChange={(e) => handleItemCheck(Number(product.id), e.target.checked)}
          />
        ))}
      </div>
      <div className='mt-5 w-full bg-white px-7.5 py-5 lg:mt-0 lg:w-[450px]'>
        <div className='py-5'>
          <CartSideBar
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            totalDiscount={totalDiscount}
            shippingFee={shippingFee}
            finalAmount={finalAmount}
            totalRewardPoints={totalRewardPoints}
          />
          <ButtonBase className='mt-7' fullWidth onClick={handlePurchase}>
            구매하기
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}
