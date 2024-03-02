import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import { UserInfo, UserInfoData } from '../../@types/userInfo';

// 사용자 정보 수정 API
export const updateUserInfoAPI = async (dataObj: UserInfoData) => {
  const res = await userAxios.patch('api/v1/user', { ...dataObj });
  return res;
};
export const useUserInfoUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['userInfoUpdate'],
    async (dataObj: UserInfoData) => {
      const res = await updateUserInfoAPI(dataObj);
      return res;
    },
    {
      onSuccess: async () => {
        return queryClient.invalidateQueries(['userInfo']);
      },
    },
  );
};

// 사용자 정보 조회 API
const fetchUserInfo = (): Promise<UserInfo> => {
  return userAxios.get('api/v1/user/my');
};
export const useUserInfoData = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    refetchOnWindowFocus: false,
  });
};
