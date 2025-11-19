import { useEffect } from 'react';
import { Router } from '@/routes';
import { useFavoriteStore } from '@/features/favorite';
import { useAuthStore } from '@/features/auth';

function App() {
  const { access } = useAuthStore();
  const syncWithBackend = useFavoriteStore((state) => state.syncWithBackend);
  
  useEffect(() => {
    if (access) {
      syncWithBackend();
    }
  }, [access, syncWithBackend]);

  return <Router />;
}

export default App;
