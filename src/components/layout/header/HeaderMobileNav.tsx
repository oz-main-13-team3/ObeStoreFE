import { HEADER_ICONS_LINKS, HEADER_NAV_LINKS, type HeaderIconLinkType } from '@/constants';
import { useToggleStore } from '@/store';
import { Link } from 'react-router-dom';

export function HeaderMobileNav() {
  const closeMenu = useToggleStore((state) => state.closeMenu);
  return (
    <div className='flex flex-col items-center gap-8 text-lg font-black md:hidden'>
      {HEADER_NAV_LINKS.map(({ label, href }) => (
        <Link key={label} to={href} onClick={closeMenu}>
          {label}
        </Link>
      ))}
      {HEADER_ICONS_LINKS.filter(
        (link): link is Extract<HeaderIconLinkType, { type: 'link' }> =>
          link.type === 'link' && link.responsiveClass === 'mobile-hidden'
      ).map((link) => (
        <Link key={link.label} to={link.href} onClick={closeMenu}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
