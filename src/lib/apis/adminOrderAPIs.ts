import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminAxios } from './customAxios';
import {
  AdminOrderDetail,
  AdminOrderList,
  AdminProductRefundData,
  AdminTrackingNumberModifyData,
  AdminTrackingNumberUploadData,
  AdminRefundableProductList,
} from '../../@types/adminOrder';
import { NUMBER_OF_ORDERS } from '../constants/pageSizes';

// [admin] 운송장 정보 등록 API
export const uploadTrackingNumberAPI = async (
  dataAndParamsObj: AdminTrackingNumberUploadData,
) => {
  const { ordersId, ordersDetailId, deliveryCarrier, trackingNumber } =
    dataAndParamsObj;

  const res = await adminAxios.post(
    `orders/${ordersId}/orders-detail/${ordersDetailId}/delivery`,
    {
      deliveryCarrier,
      trackingNumber,
    },
  );
  return res;
};
// [admin] 운송장 정보 등록 mutation
export const useTrackingNumberUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['trackingNumberUpload'],
    async (dataObj: AdminTrackingNumberUploadData) => {
      const { data } = await uploadTrackingNumberAPI(dataObj);

      return data;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['orderList']),
          queryClient.invalidateQueries(['orderDetail']),
        ]);
      },
    },
  );
};

// [admin] 운송장 정보 수정 API
export const modifyTrackingNumberAPI = async (
  dataAndParamsObj: AdminTrackingNumberModifyData,
) => {
  const {
    ordersId,
    ordersDetailId,
    deliveryCarrier,
    trackingNumber,
    deliveryId,
  } = dataAndParamsObj;

  const res = await adminAxios.patch(
    `orders/${ordersId}/orders-detail/${ordersDetailId}/delivery/${deliveryId}`,
    {
      deliveryCarrier,
      trackingNumber,
    },
  );
  return res;
};
// [admin] 운송장 정보 수정 mutation
export const useTrackingNumberModifyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['trackingNumberUpload'],
    async (dataObj: AdminTrackingNumberModifyData) => {
      const { data } = await modifyTrackingNumberAPI(dataObj);

      return data;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['orderList']),
          queryClient.invalidateQueries(['orderDetail']),
        ]);
      },
    },
  );
};

// [admin] 반품 신청 API
export const requestRefundAPI = async (data: AdminProductRefundData) => {
  const {
    ordersId,
    merchantUid,
    refundProductList: cancelOrdersDetails,
  } = data;

  const res = await adminAxios.post(`orders/${ordersId}/${merchantUid}`, {
    cancelOrdersDetails,
  });

  return res;
};
// [admin] 반품 신청 mutation
export const useRefundRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['refundRequest'],
    async (dataObj: AdminProductRefundData) => {
      const { data } = await requestRefundAPI(dataObj);

      return data;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['orderList']),
          queryClient.invalidateQueries(['orderDetail']),
          queryClient.invalidateQueries(['productList']),
          queryClient.invalidateQueries(['productDetail']),
        ]);
      },
    },
  );
};

// [admin] 주문 목록 조회 API
const fetchAdminOrderList = (page: number): Promise<AdminOrderList> => {
  return adminAxios.get(`orders?page=${page}&size=${NUMBER_OF_ORDERS}`);
};
// [admin] 주문 목록 조회 query
export const useAdminOrderListData = (page: number = 0) => {
  return useQuery({
    queryKey: ['orderList', page],
    queryFn: () => fetchAdminOrderList(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// [admin] 주문 상세 조회 API
const fetchAdminOrderDetail = (
  ordersId: string,
  merchantUid: string,
): Promise<AdminOrderDetail> => {
  return adminAxios.get(`orders/${ordersId}/${merchantUid}`);
};
// [admin] 주문 상세 조회 query
export const useAdminOrderDetailData = (
  ordersId: string,
  merchantUid: string,
) => {
  return useQuery({
    queryKey: ['orderDetail', ordersId, merchantUid],
    queryFn: () => fetchAdminOrderDetail(ordersId, merchantUid),
    enabled: !!ordersId && !!merchantUid,
    refetchOnWindowFocus: false,
  });
};

// [admin] 반품 가능한 상품 목록 조회 API
const fetchAdminRefundableProductList = (
  ordersId: number,
  merchantUid: string,
): Promise<AdminRefundableProductList> => {
  return adminAxios.get(`orders/${ordersId}/${merchantUid}/refunds`);
};
// [admin] 반품 가능한 상품 목록 조회 query
export const useAdminRefundableProductListData = (
  ordersId: number,
  merchantUid: string,
) => {
  return useQuery({
    queryKey: ['refundableProductList', ordersId, merchantUid],
    queryFn: () => fetchAdminRefundableProductList(ordersId, merchantUid),
    enabled: !!ordersId && !!merchantUid,
    refetchOnWindowFocus: false,
  });
};
