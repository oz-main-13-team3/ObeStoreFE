import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AboutPage,
  CallbackPage,
  CartPage,
  WishlistPage,
  MainPage,
  MyPage,
  MyPageAddressInfo,
  MyPageInfo,
  MyPageOrderDetail,
  MyPageOrderInfo,
  OrderPage,
  ProductDetailPage,
  ProductsPage,
} from '@/pages';
import { MyPageLayout, RootLayout } from '@/components/layout';
import { OrderComplete, OrderFail } from '@/features/order';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderResult } from '@/features/order/OrderResult';
import { useSyncWishlist } from '@/features/wishlist';
// import { ProtectedRoute } from '@/routes';

export function Router() {
  const queryClient = new QueryClient();
  useSyncWishlist();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='/auth/naver/callback' element={<CallbackPage />} />
            <Route path='/auth/naver/callback/' element={<CallbackPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductDetailPage />} />
            <Route path='/order/order' element={<OrderPage />} />
            <Route path='/order/fail' element={<OrderFail />} />
            <Route path='/order/result' element={<OrderResult />} />
            <Route path='/order/complete' element={<OrderComplete />} />
            {/* <Route element={<ProtectedRoute />}> </Route> */}
            <Route path='/users/wishlist' element={<WishlistPage />} />
            <Route path='/users/cart' element={<CartPage />} />
            <Route path='/users' element={<MyPageLayout />}>
              <Route index element={<MyPage />} />
              <Route path='orders' element={<MyPageOrderInfo />} />
              <Route path='orders/:orderId' element={<MyPageOrderDetail />} />
              <Route path='addressinfo' element={<MyPageAddressInfo />} />
              <Route path='info' element={<MyPageInfo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
