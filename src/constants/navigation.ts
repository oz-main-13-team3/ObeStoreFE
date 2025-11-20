import type { ComponentType } from 'react';
import type { IconProps } from '@/components/types';
import { SearchToggleButton } from '@/features/search';
import { ProfileIcon, CartIcon, EmptyHeartIcon } from '@/components/icon';

export const HEADER_NAV_LINKS = [
  { href: '/products', label: 'OBJETS' },
  { href: '/products?category=패션', label: 'FASHION' },
  { href: '/products?category=리빙', label: 'LIVING' },
  { href: '/about', label: 'ABOUT' },
];

export type HeaderIconLinkType =
  | {
      type: 'action';
      action: string;
      label: string;
      Icon: ComponentType<IconProps>;
      responsiveClass?: string;
    }
  | {
      type: 'link';
      href: string;
      label: string;
      Icon: ComponentType<IconProps>;
      responsiveClass?: string;
    };

export const HEADER_ICONS_LINKS: HeaderIconLinkType[] = [
  {
    type: 'action',
    action: 'openSearchModal',
    label: 'SEARCH',
    Icon: SearchToggleButton,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/users',
    label: 'MYPAGE',
    Icon: ProfileIcon,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/users/wishlist',
    label: 'WISHLIST',
    Icon: EmptyHeartIcon,
    responsiveClass: 'mobile-hidden',
  },
  {
    type: 'link',
    href: '/users/cart',
    label: 'CART',
    Icon: CartIcon,
    responsiveClass: 'mobile-hidden',
  },
];
