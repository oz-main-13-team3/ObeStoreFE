import type { ProductCardType } from '@/types';
import { useWishlistStore, useWishlistMutations } from '@/features/wishlist';
import { EmptyHeartIcon, FilledHeartIcon } from '@/components/icon';
import { useAuthStore } from '@/features/auth';
import { useModalStore } from '@/store';

interface WishlistIconProps {
  product: ProductCardType;
  className?: string;
}

export function WishlistIcon({ product, className }: WishlistIconProps) {
  const { wishlistProducts } = useWishlistStore();
  const { access } = useAuthStore();
  const { openModal } = useModalStore();

  const { add: addToWishlist, remove: removeFromWishlist } = useWishlistMutations();

  const wishlistItem = wishlistProducts.find((item) => item.id === product.id);
  const isWishlisted = !!wishlistItem;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!access) {
      alert('로그인이 필요한 기능입니다.');
      openModal('login');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist.mutate(wishlistItem.id);
    } else {
      addToWishlist.mutate(product.id);
    }
  };

  const isPending = addToWishlist.isPending || removeFromWishlist.isPending;

  return (
    <button className={`cursor-pointer ${className}`} onClick={handleClick} disabled={isPending}>
      {isWishlisted ? (
        <FilledHeartIcon size={28} color='var(--color-secondary-300)' />
      ) : (
        <EmptyHeartIcon size={28} color='var(--color-secondary-300)' />
      )}
    </button>
  );
}
