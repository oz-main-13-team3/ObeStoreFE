import { useAuthStore } from '@/features/auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

export function MypageNav() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isOrderActive = () => {
    const path = location.pathname;
    return path.startsWith('/users/orders');
  };

  const handleLogout = async () => {
    try {
      await logout(navigate);
    } catch (err) {
      console.error('로그아웃 에러:', err);
    }
  };

  return (
    <div className='m-4 flex w-60 flex-col gap-4 lg:m-8 lg:gap-8'>
      <h2 className='flex text-2xl font-semibold'>MYPAGE</h2>
      <ul className='flex w-full flex-1 flex-col gap-4 lg:gap-8'>
        <li>
          <NavLink
            to='/users/orders'
            className={() =>
              `text-primary-500-90 flex font-bold lg:text-lg ${
                isOrderActive() ? 'text-secondary-300 font-semibold' : 'text-gray-500'
              } w-full items-center justify-between`
            }
          >
            주문/상세 내역
            <IoIosArrowForward className='hidden lg:flex' />
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/users/info'
            className={({ isActive }) =>
              `text-primary-500-90 flex font-bold lg:text-lg ${isActive ? 'text-secondary-300 font-semibold' : 'text-gray-500'} w-full items-center justify-between`
            }
          >
            나의 정보 조회/수정
            <IoIosArrowForward className='hidden lg:flex' />
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/users/addressinfo'
            className={({ isActive }) =>
              `text-primary-500-90 flex font-bold lg:text-lg ${isActive ? 'text-secondary-300 font-semibold' : 'text-gray-500'} w-full items-center justify-between`
            }
          >
            배송지 정보 조회/수정
            <IoIosArrowForward className='hidden lg:flex' />
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className='text-primary-500-70 cursor-pointer font-bold lg:text-lg'
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}