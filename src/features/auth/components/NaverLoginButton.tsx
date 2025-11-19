import { ButtonBase } from '@/components/ui';
import { naverIcon } from '@/assets';

export function NaverLoginButton() {
  const handleLogin = () => {
    const NAVER_LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/naver/login?redirect_uri=${encodeURIComponent('https://obe-store.vercel.app/auth/naver/callback')}`;
    window.location.href = NAVER_LOGIN_URL;
  };

  return (
    <ButtonBase
      onClick={handleLogin}
      className='auth-button flex items-center justify-center gap-2'
      variant='hollow'
    >
      <img src={naverIcon} alt='Naver' className='h-10 w-10' />
      네이버 간편 로그인
    </ButtonBase>
  );
}
