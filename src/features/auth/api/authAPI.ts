import { backendAPI } from '@/api';
import { API_ENDPOINTS } from '@/features/auth';

export const authLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await backendAPI.post(API_ENDPOINTS.LOGIN, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const authSignup = (data: {
  email: string;
  password: string;
  username: string;
  nickname: string;
  phone_number: string;
  email_checked: boolean;
}) => backendAPI.post(API_ENDPOINTS.SIGNUP, data);

export const authLogout = () => backendAPI.post(API_ENDPOINTS.LOGOUT);

export const checkEmail = async (email: string) => {
  const res = await backendAPI.get(API_ENDPOINTS.EMAIL_CHECK, {
    params: { email },
  });
  return res.data;
};
