import { WishlistGrid } from '@/features/wishlist';

export function WishlistPage() {
  return (
    <main className='p-4'>
      <h1 className='mb-4 text-xl font-bold'>찜 목록</h1>
      <WishlistGrid />
    </main>
  );
}
