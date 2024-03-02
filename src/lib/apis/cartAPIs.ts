import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import { Cart } from '../../@types/cart';

// 장바구니 추가 API
export const addCartAPI = async (productId: number | string) => {
  if (!productId) return;

  const res = await userAxios.post(`api/v1/cart?productId=${productId}`);
  return res;
};
export const useCartAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cartAdd'],
    mutationFn: async (productId: number) => {
      const res = await addCartAPI(productId);
      return res;
    },
    onSuccess: async () => {
      return Promise.all([queryClient.invalidateQueries(['cart'])]);
    },
  });
};

// 장바구니 아이템 하나 삭제 API (개별)
export const deleteCartItemAPI = async (cartId: number | string) => {
  const res = await userAxios.delete(`api/v1/cart/${cartId}`);
  return res;
};
export const useCartItemDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['cartAllDelete'],
    async (cartId: number | string) => {
      const res = await deleteCartItemAPI(cartId);
      return res;
    },
    {
      onSuccess: async () => {
        return Promise.all([queryClient.invalidateQueries(['cart'])]);
      },
    },
  );
};

// 장바구니 선택 삭제 API (다중)
export const deleteCartItemListAPI = async (
  cartIdList: number[] | string[],
) => {
  const res = await userAxios.delete(
    `api/v1/cart?cartIdList=${cartIdList.join(',')}`,
  );
  return res;
};
export const useCartItemListDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['cartItemDelete'],
    async (productIdList: number[] | string[]) => {
      const res = await deleteCartItemListAPI(productIdList);
      return res;
    },
    {
      onSuccess: async () => {
        return Promise.all([queryClient.invalidateQueries(['cart'])]);
      },
    },
  );
};

// 장바구니 조회
const fetchCart = (): Promise<Cart> => {
  return userAxios.get('api/v1/cart');
};
export const useCartData = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 0,
  });
};
