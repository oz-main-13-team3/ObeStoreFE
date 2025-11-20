import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/layout';
import { GlobalModalManager } from '@/features/auth';
import { useSearchNavigation } from '@/features/search';

export function RootLayout() {
  useSearchNavigation();
  return (
    <div className='flex min-h-screen w-full flex-col items-center'>
      <Header />
      <GlobalModalManager />
      <main className='container-1200 min-h-screen grow pt-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
