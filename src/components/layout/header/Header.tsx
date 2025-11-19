import { HeaderLogoIcon, MenuIcon } from '@/components/icon';
import { HeaderIcons, HeaderMobileNav, HeaderNav } from '@/components/layout';
import { AuthButton } from '@/features/auth';
import { SearchModal } from '@/features/search';
import { motion, AnimatePresence } from 'framer-motion';
import { useToggleStore } from '@/store';

export function Header() {
  const { isOpen, toggleMenu } = useToggleStore();
  return (
    <header className='fixed top-0 z-100 flex w-full justify-center bg-white'>
      <div className='bg-primary-100 container-1200 flex h-16 grow items-center justify-between px-8'>
        <div className='flex gap-8'>
          <button className='md:hidden' onClick={toggleMenu} aria-label='메뉴 열기'>
            {isOpen ? <div className='pt-0.5 text-xl font-black'>✕</div> : <MenuIcon />}
          </button>
          <HeaderLogoIcon width={48} />
          <HeaderNav />
        </div>
        <div className='flex h-9 gap-8'>
          <HeaderIcons />
          <SearchModal />
          <AuthButton />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='bg-primary-100 absolute top-16 left-0 w-full pb-8 md:hidden'
          >
            <div>
              <HeaderMobileNav />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
