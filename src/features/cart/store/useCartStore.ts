import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/order';

type CartState = {
  cartItems: CartItem[];
  selectAll: boolean;

  // actions
  setCartItems: (items: CartItem[]) => void; // 초기 세팅
  handleSelectAll: (checked: boolean) => void; // 전체 선택
  handleItemCheck: (id: string, checked: boolean) => void; // 개별 선택
  removeCheckedItems: () => void; // 선택 삭제
};

const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3500;
const REWARD_RATE = 0.01; // 1%

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      selectAll: false,

      setCartItems: (items) => set({ cartItems: items }),

      handleSelectAll: (checked) =>
        set((state) => ({
          selectAll: checked,
          cartItems: state.cartItems.map((item) => ({ ...item, checked })),
        })),

      handleItemCheck: (id, checked) =>
        set((state) => {
          const updated = state.cartItems.map((item) =>
            item.id === Number(id) ? { ...item, checked } : item
          );
          const allChecked = updated.every((item) => item.checked);
          return { cartItems: updated, selectAll: allChecked };
        }),

      removeCheckedItems: () =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => !item.checked),
          selectAll: false,
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);

///////// calculate /////

export const useCheckedItemSum = () =>
  useCartStore((state) =>
    Math.floor(
      state.cartItems
        .filter((i) => i.checked)
        .reduce((acc, item) => acc + item.price * item.amount, 0)
    )
  );

export function useSelectedQuantity() {
  return useCartStore((state) =>
    state.cartItems.filter((i) => i.checked).reduce((acc, item) => acc + item.amount, 0)
  );
}

export const useDiscountSum = () => {
  return 0;
};

export const useShippingFee = () => {
  return useCartStore((state) => {
    const checkedItems = state.cartItems.filter((i) => i.checked);
    const sum = checkedItems.reduce((acc, item) => acc + item.price * item.amount, 0);

    const total = Math.floor(sum);
    // 선택된 상품이 0개면 배송비 없음
    if (checkedItems.length === 0) return 0;
    // 금액이 50,000원 이상이면 무료배송
    if (total >= FREE_SHIPPING_THRESHOLD) return 0;
    // 나머지는 3,500원
    return SHIPPING_FEE;
  });
};

export const useTotalPayment = () => {
  return useCartStore((state) => {
    const checkedItems = state.cartItems.filter((i) => i.checked);
    const sum = checkedItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    const total = Math.floor(sum);

    if (checkedItems.length === 0) return 0;
    const discount = 0;
    const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return total + shipping - discount;
  });
};
export const useRewardPoints = () =>
  useCartStore((state) => {
    const checkedItems = state.cartItems.filter((i) => i.checked);
    const sum = checkedItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    return Math.floor(sum * REWARD_RATE);
  });
