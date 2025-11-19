import { backendAPI } from '@/api';
import { authLogin, authSignup, authLogout, API_ENDPOINTS } from '@/features/auth';
import { useWishlistStore } from '@/features/wishlist';
import { useRewardStore } from '@/features/reward/store';
import type { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SignupPayload {
  email: string;
  password: string;
  username: string;
  nickname: string;
  phone_number: string;
  email_checked: boolean;
}

interface AuthState {
  access: string | null;
  user: any | null;
  setToken: (access: string) => void;
  setUser: (user: any) => void;
  signup: (data: SignupPayload) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: (navigate: NavigateFunction) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        access: null,
        user: null,
        setToken: (access) => set({ access }),
        setUser: (user) => set({ user }),
        signup: async (data) => {
          await authSignup(data);
        },
        login: async (email, password) => {
          const { access } = await authLogin({ email, password });
          set({ access });

          const user = await backendAPI.get(API_ENDPOINTS.USER).then((res) => res.data);
          set({ user });
        },
        logout: async (navigate) => {
          try {
            await authLogout();
          } catch (error) {
            console.error('로그아웃 API 호출 실패:', error);
          } finally {
            set({ access: null, user: null });
            useWishlistStore.getState().reset();
            useRewardStore.getState().resetReward();
            navigate('/');
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          access: state.access,
          user: state.user,
        }),
      }
    )
  )
);
