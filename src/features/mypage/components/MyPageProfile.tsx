import { UserProfileIcon } from '@/components/icon';
import { useAuthStore } from '@/features/auth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function MyPageProfile() {
  const user = useAuthStore((state) => state.user);

  const [ready, setReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      setReady(true);
    }
  }, [hydrated, user]);

  if (!ready) return null;
  return (
    <div className='p-8'>
      <Link to='/users' className='flex items-center gap-4'>
        <UserProfileIcon />
        <p className='text-lg font-bold'>{user.nickname}</p>
      </Link>
    </div>
  );
}
