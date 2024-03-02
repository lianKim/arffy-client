import axios from 'axios';
import { userAxios } from './customAxios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const { VITE_USER_SERVER_BASE_URL } = import.meta.env;

// 로그아웃
export const signOutAPI = async (accessToken: string) => {
  const res = await userAxios.post(`api/v1/auth/logout?token=${accessToken}`);

  return res;
};
export const useSignOutMutation = () => {
  return useMutation({
    mutationKey: ['cartAdd'],
    mutationFn: async (token: string) => {
      const res = await signOutAPI(token);
      return res;
    },
  });
};

// 액세스 토큰 재발급
export const renewAccessTokenAPI = async (currAccessToken: string) => {
  const newAxios = axios.create();
  const { data } = await newAxios.post(
    `${VITE_USER_SERVER_BASE_URL}/api/v1/auth/refresh?token=${currAccessToken}`,
  );

  return data;
};

// 회원 탈퇴
export const deleteAccountAPI = async () => {
  const res = await userAxios.delete('api/v1/user');

  return res;
};
export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['accountDelete'],
    mutationFn: async () => {
      const res = await deleteAccountAPI();
      return res;
    },
    onSuccess: () => {
      return Promise.all([queryClient.invalidateQueries(['cart'])]);
    },
  });
};
