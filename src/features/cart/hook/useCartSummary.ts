import { useMemo } from 'react';

import { useRewardStore } from '@/features/reward/store';
import {
  useCheckedItemSum,
  useDiscountSum,
  useRewardPoints,
  useSelectedQuantity,
  useShippingFee,
  useTotalPayment,
} from '@/features/cart/store';

export function useCartSummary() {
  const checkedItemSum = useCheckedItemSum();
  const discountSum = useDiscountSum();
  const shippingFee = useShippingFee();
  const baseTotalPayment = useTotalPayment();
  const rewardPoints = useRewardPoints();
  const totalQuantity: number = useSelectedQuantity();

  const { usedPoints } = useRewardStore();

  const totalPayment = useMemo(() => {
    const result = baseTotalPayment - usedPoints;
    return result < 0 ? 0 : result; // 마이너스 방지
  }, [baseTotalPayment, usedPoints]);

  const shippingFeeText = useMemo(() => {
    if (totalQuantity === 0) return '0원';
    if (shippingFee === 0) return '무료 배송';
    return `${shippingFee.toLocaleString()}원`;
  }, [totalQuantity, shippingFee]);
  return {
    checkedItemSum,
    discountSum,
    shippingFee,
    shippingFeeText,
    totalPayment,
    rewardPoints,
    totalQuantity,
    usedPoints,
  };
}
