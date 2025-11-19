import { ProductCard } from '@/features/product';
import { useWishlistStore } from '@/features/wishlist';

export function FavoriteGrid() {
  const { wishlistProducts } = useWishlistStore();

  return (
    <div className='m-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 self-stretch'>
      {wishlistProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
