interface CartSideBarProps {
  selectedItems: number[];
  totalPrice: number;
  totalDiscount: number;
  shippingFee: number;
  finalAmount: number;
  totalRewardPoints: number;
}
export function CartSideBar({
  selectedItems,
  totalPrice,
  totalDiscount,
  shippingFee,
  finalAmount,
  totalRewardPoints,
}: CartSideBarProps) {
  return (
    <>
      <h3 className='text-lg font-bold'>구매 금액</h3>
      <ul className='mt-3 text-base leading-7'>
        <li className='flex justify-between'>
          <span>선택된 상품 </span>
          <span>{selectedItems.length}개</span>
        </li>
        <li className='flex justify-between'>
          <span>상품 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </li>
        <li className='flex justify-between'>
          <span>할인 금액</span>
          <span>{totalDiscount.toLocaleString()}원</span>
        </li>
        <li className='flex justify-between'>
          <span>배송비</span>
          <span>{shippingFee.toLocaleString()}원</span>
        </li>
        <li className='mt-4 flex justify-between'>
          <span className='font-semibold'>총 결제 금액</span>
          <span className='font-semibold'>
            <span className='font-semibold'>{finalAmount.toLocaleString()}원</span>
          </span>
        </li>
        <li className='flex justify-between'>
          <span className=''>적립 혜택 예상</span>
          <span className=''>
            <span>{totalRewardPoints.toLocaleString()}원</span>
          </span>
        </li>
      </ul>
      {/* <ButtonBase className='mt-7' fullWidth onClick={handlePurchase}>
          {`${totalPayment.toLocaleString()}원 구매하기 (${totalQuantity}개)`}
        </ButtonBase> */}
    </>
  );
}
