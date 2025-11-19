import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/layout';
import { useFavoriteStore } from '@/features/favorite';
import { useAuthStore } from '@/features/auth';

export function Layout() {
  const { access } = useAuthStore();
  const syncWithBackend = useFavoriteStore((state) => state.syncWithBackend);
  
  useEffect(() => {
    if (access) {
      syncWithBackend();
    }
  }, [access, syncWithBackend]);

  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
