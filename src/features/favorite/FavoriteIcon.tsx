import type { ProductCardType } from '@/types';
import { useFavoriteStore } from '@/features/favorite';
import { EmptyHeartIcon, FilledHeartIcon } from '@/components/icon';
import { useAuthStore } from '@/features/auth';
import { useModalStore } from '@/store';

interface FavoriteIconProps {
  product: ProductCardType;
  className?: string;
}

export function FavoriteIcon({ product, className }: FavoriteIconProps) {
  const { favoriteProducts, toggleFavorite } = useFavoriteStore();
  const { access } = useAuthStore();
  const { openModal } = useModalStore();

  const isFavorited = favoriteProducts.some((p) => p.id === product.id);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!access) {
      alert('로그인이 필요한 기능입니다.');
      openModal('login');
    } else {
      await toggleFavorite(product);
    }
  };

  return (
    <button className={`cursor-pointer ${className}`} onClick={handleClick}>
      {isFavorited ? (
        <FilledHeartIcon size={28} color='var(--color-secondary-300)' />
      ) : (
        <EmptyHeartIcon size={28} color='var(--color-secondary-300)' />
      )}
    </button>
  );
}
