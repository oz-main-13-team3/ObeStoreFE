import { useWishlistStore } from '@/features/wishlist';
import { useRewardStore } from '@/features/reward/store';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

export function MyPage() {
  const { wishlistProducts } = useWishlistStore();
  const { totalPoints } = useRewardStore();

  return (
    <section className='flex h-full w-full flex-col gap-4 px-8'>
      <p>첫 리뷰를 작성하고 특별한 혜택을 받으세요!</p>
      <div className='bg-primary-100 flex w-full justify-between'>
        <div className='flex flex-col p-4'>
          <NavLink to='/users/Wishlists' className='flex items-center gap-4 font-bold'>
            찜한 상품
            <IoIosArrowForward />
          </NavLink>
          <p>{wishlistProducts?.length ?? 0}개</p>
        </div>
        <div className='flex w-1/2 flex-col p-4'>
          <div className='flex items-center gap-4 font-bold'>적립금</div>
          <p>{totalPoints}원</p>
        </div>
      </div>
    </section>
  );
}
