import { CheckBox } from '@/components/ui';
type CartCardProps = {
  id: number;
  product_name: string;
  price: number;
  amount: number;
  checked: boolean;
  cart: number;
  product_card_image?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CartCard({
  id,
  product_name,
  price,
  amount,
  checked,
  onChange,
  product_card_image,
}: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none'>
        <div>
          <CheckBox id={id} label='' onChange={onChange} checked={checked} className='mr-3' />
        </div>
        <div className='mr-9 w-[200px]'>
          <img src={product_card_image} className='w-full' alt='' />
        </div>
        <div>
          <div className='text-color-primary-700) mt-3 line-clamp-2 text-base font-normal text-ellipsis'>
            {product_name}
          </div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{amount}개</div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{price}원</div>
        </div>
      </div>
    </>
  );
}

export function CartCardNone({ product_name, price, amount, product_card_image }: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none'>
        <div className='mr-9 w-[200px]'>
          <img src={product_card_image} className='w-full' alt='' />
        </div>
        <div>
          <div className='text-color-primary-700) mt-3 line-clamp-2 text-base font-normal text-ellipsis'>
            {product_name}
          </div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{amount}개</div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{price}원</div>
        </div>
      </div>
    </>
  );
}
