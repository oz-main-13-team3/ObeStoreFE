import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductDetailType } from '@/types';
import { ButtonBase, ReviewRating } from '@/components/ui';
import { EmptyHeartIcon, FilledHeartIcon } from '@/components/icon/HeartIcon';
import { ProductReviews } from '@/features/product';
import { ProductQnA } from './ProductQnA';
import { useProductToCart } from './api/useProductToCart';

interface ProductDetailProps {
  product: ProductDetailType;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('info');
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(product.favorite_count || 0);
  const { mutate: addToCart } = useProductToCart();

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setFavoriteCount((prev) => prev - 1);
    } else {
      setIsFavorite(true);
      setFavoriteCount((prev) => prev + 1);
    }
  };

  const totalPrice = product.dc_value * quantity;

  const tabs = [
    { id: 'info', label: '상품 정보' },
    { id: 'review', label: '리뷰' },
    { id: 'exchange', label: '교환/환불' },
    { id: 'shipping', label: '배송 안내' },
    { id: 'qna', label: '상품 Q&A' },
  ];

  const handleAddToCart = () => {
    addToCart([product, quantity]);
    navigate('/users/cart');
  };

  return (
    <article className='mx-auto max-w-7xl'>
      <div className='grid grid-cols-1 gap-8 p-6 lg:grid-cols-2'>
        <section>
          <div className='aspect-square overflow-hidden bg-white'>
            <img
              src={product.product_image[0]?.product_card_image}
              alt={product.product_name}
              className='h-full w-full object-cover'
            />
          </div>
        </section>

        <section className='flex flex-col space-y-6 pt-8'>
          <div className='flex items-center gap-2'>
            <div className='flex h-6 w-6 items-center justify-center'>
              {product.brand_image?.[0]?.brand_image ? (
                <img
                  src={product.brand_image[0].brand_image}
                  alt={product.brand_name}
                  className='h-full w-full object-contain'
                />
              ) : (
                <span className='text-base'>🏠</span>
              )}
            </div>
            <span className='text-base font-medium text-gray-700'>{product.brand_name}</span>
          </div>

          <h1 className='text-lg font-medium text-gray-900'>{product.product_name}</h1>

          <div className='flex items-center justify-between'>
            {product.product_rating && (
              <ReviewRating initialValue={Number(product.product_rating)} readOnly />
            )}
            <span className='text-sm text-gray-500'>
              ({product.product_rating ? `${product.product_rating}/5` : '0/5'})
            </span>
          </div>

          <div className='border-primary-500-40 space-y-4 border-t border-b py-4'>
            <div className='rounded bg-gray-50 px-3 py-2'></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className='flex h-7 w-7 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50'
                >
                  −
                </button>
                <span className='w-8 text-center text-sm'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className='flex h-7 w-7 items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50'
                >
                  +
                </button>
              </div>

              <div className='text-right'>
                {product.discount_rate > 0 && (
                  <div className='text-xs text-gray-400 line-through'>
                    {product.product_value.toLocaleString()}원
                  </div>
                )}
                <div className='text-base font-bold text-gray-900'>
                  {product.dc_value.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
          <div className='text-custom-gray-60'>결제 금액 5만원 이상시 무료, 미만시 배송비 3,500원</div>
          <div className='flex items-center justify-between py-2'>
            <span className='text-base text-gray-600'>총 {quantity}개</span>
            <span className='text-2xl font-bold text-gray-900'>
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <div className='flex items-center justify-end gap-2'>
            <button
              onClick={handleFavoriteClick}
              className='flex h-16 w-16 flex-col items-center justify-center gap-1 bg-white transition-colors hover:bg-gray-50'
            >
              {isFavorite ? (
                <FilledHeartIcon size={20} color='#ef4444' />
              ) : (
                <EmptyHeartIcon size={20} color='#9ca3af' />
              )}
              <span className='text-xs text-gray-600'>{favoriteCount}</span>
            </button>
            <ButtonBase onClick={handleAddToCart} variant='filled' className='px-8 py-3 text-sm'>
              장바구니에 담기
            </ButtonBase>
          </div>
        </section>
      </div>

      <nav className='border-primary-500-40 bg-primary-50 border-t border-b'>
        <div className='mx-auto flex max-w-7xl overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-primary-700 text-primary-700 border-b-2'
                  : 'text-primary-500-80 hover:text-primary-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className='mx-auto max-w-7xl p-6'>
        {activeTab === 'info' && (
          <div className='space-y-8'>
            {product.brand_name && (
              <section className='text-center'>
                <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center'>
                  {product.brand_image?.[0]?.brand_image ? (
                    <img
                      src={product.brand_image[0].brand_image}
                      alt={product.brand_name}
                      className='h-full w-full object-contain'
                    />
                  ) : (
                    <span className='text-5xl'>🏠</span>
                  )}
                </div>
                <p className='text-xl text-gray-700'>{product.product_name}</p>
              </section>
            )}

            {product.product_image[0]?.product_explain_image && (
              <section className='w-full'>
                <img
                  src={product.product_image[0].product_explain_image}
                  alt={`${product.product_name} 상세 이미지`}
                  className='w-full'
                />
              </section>
            )}
          </div>
        )}

        {activeTab === 'review' && <ProductReviews product={product} />}

        {activeTab === 'exchange' && (
          <div className='border-primary-500-40 rounded-lg border bg-white p-6'>
            <h3 className='text-primary-500-90 mb-4 text-lg font-bold'>교환 및 반품 안내</h3>
            <div className='text-primary-500-80 space-y-2 text-sm'>
              <p>• 상품 수령 후 7일 이내 교환/반품 가능합니다.</p>
              <p>• 단순 변심의 경우 왕복 배송비가 부과됩니다.</p>
              <p>• 상품 하자의 경우 무료 교환/반품이 가능합니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className='border-primary-500-40 rounded-lg border bg-white p-6'>
            <h3 className='text-primary-500-90 mb-4 text-lg font-bold'>배송 안내</h3>
            <div className='text-primary-500-80 space-y-2 text-sm'>
              <p>• 배송비: 결제 금액 5만원 이상 시 무료배송, 미만 시 3500원</p>
              <p>• 배송 기간: 주문 후 2-3일 소요</p>
              <p>• 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'qna' && <ProductQnA productId={product.id} />}
      </div>
    </article>
  );
}
