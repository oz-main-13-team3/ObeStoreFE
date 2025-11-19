import { Link } from 'react-router-dom';
import { ReviewRating } from '@/components/ui';
import type { ProductCardType } from '@/types';
import { WishlistIcon } from '@/features/wishlist';

interface ProductCardProps {
  product: ProductCardType;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className='flex max-h-[810px] min-h-96 max-w-[490px] min-w-60 flex-col items-center justify-center gap-4 text-center'>
        <div className='relative aspect-3/4 max-h-[730px] w-full'>
          <img
            src={product.product_image[0]?.product_card_image}
            alt={product.product_name}
            className='max-h-[730px] w-auto object-cover object-top'
            width={300}
            height={400}
          />
          <WishlistIcon product={product} className='absolute right-4 bottom-4' />
        </div>

        <div className='flex h-20 w-full grow flex-col justify-evenly gap-2 text-left text-xs'>
          <h2>{product.brand_name}</h2>
          <h3 className='font-bold'>{product.product_name}</h3>
          <div className='flex items-center justify-between pr-px'>
            {Number(String(product.discount_rate) !== '0.00') ? (
              <div className='flex flex-col'>
                <div className='flex gap-2 text-[10px]'>
                  <p className='text-primary-500-70 line-through'>
                    ₩{Number(product.product_value).toLocaleString('ko-KR')}
                  </p>
                  <p className='text-secondary-300'>{Number(product.discount_rate) * 100}%</p>
                </div>
                <p className='font-bold'>₩{Number(product.dc_value).toLocaleString('ko-KR')}</p>
              </div>
            ) : (
              <p className='font-bold'>₩{Number(product.product_value).toLocaleString('ko-KR')}</p>
            )}
            <ReviewRating initialValue={Number(product.product_rating)} readOnly size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
