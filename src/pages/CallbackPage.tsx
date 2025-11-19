import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import { useModalStore } from '@/store';

export function CallbackPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access');

    if (accessToken) {
      setToken(accessToken);
      closeModal();
      fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('토큰 인증 실패');
          return res.json();
        })
        .then((data) => {
          console.log('사용자 정보:', data);
          navigate('/users', { replace: true });
        })
        .catch((err) => {
          console.error(err);
          alert('로그인 실패');
          navigate('/', { replace: true });
        });
    } else {
      alert('로그인 실패');
      navigate('/', { replace: true });
    }
  }, [navigate, setToken, closeModal]);

  return null;
}
