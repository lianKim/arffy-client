import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import {
  InfoDataForPortOne,
  OrderNumberInfo,
  OrderNumberUploadData,
  PaymentInfo,
  PaymentVerifyData,
} from '../../@types/payment';

// 주문번호 요청
export const getOrderNumberAPI = async (productIdsJoined: string) => {
  const { data } = await userAxios.post(
    `api/v1/order?productIds=${productIdsJoined}`,
  );

  return data;
};
export const useOrderNumberGetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['orderNumberGet'],
    mutationFn: async (productIdsJoined: string): Promise<OrderNumberInfo> => {
      const res = await getOrderNumberAPI(productIdsJoined);
      return res;
    },
    onSuccess: () => queryClient.invalidateQueries(['paymentInfo']),
  });
};

// 주문번호 사전등록
export const orderNumberUploadAPI = async (dataObj: OrderNumberUploadData) => {
  const { data } = await userAxios.post('/api/v1/order/prepare', {
    ...dataObj,
  });

  return data;
};
export const useOrderNumberUploadMutation = () => {
  return useMutation({
    mutationKey: ['orderNumberUpload'],
    mutationFn: async (
      dataObj: OrderNumberUploadData,
    ): Promise<InfoDataForPortOne> => {
      const res = await orderNumberUploadAPI(dataObj);
      return res;
    },
  });
};

// 결제 검증
export const verifyPaymentAPI = async (dataObj: PaymentVerifyData) => {
  const res = await userAxios.post('api/v1/payment/verify/client', dataObj);

  return res;
};
export const usePaymentVerifyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['paymentVerify'],
    mutationFn: async (dataObj: PaymentVerifyData): Promise<any> => {
      const res = await verifyPaymentAPI(dataObj);
      return res;
    },

    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries(['cart']),
        queryClient.invalidateQueries(['orderList']),
        queryClient.invalidateQueries(['productList']),
        queryClient.invalidateQueries(['productDetail']),
      ]);
    },
  });
};

// 주문 페이지에 띄워야 할 데이터
const fetchPaymentInfo = (ordersId: number): Promise<PaymentInfo> => {
  return userAxios.get(`api/v1/order/payment/${ordersId}?ordersId=${ordersId}`);
};
export const usePaymentInfoData = (ordersId: number) => {
  return useQuery({
    queryKey: ['paymentInfo', ordersId],
    queryFn: () => fetchPaymentInfo(ordersId),
    enabled: !!ordersId,
    refetchOnWindowFocus: false,
  });
};
