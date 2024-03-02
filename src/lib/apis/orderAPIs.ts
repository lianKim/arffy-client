import { useQuery } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import { OrderDetail, OrderList } from '../../@types/order';
import { NUMBER_OF_ORDERS } from '../constants/pageSizes';

// [user] 주문 목록 조회 API
const fetchOrderList = (page: number): Promise<OrderList> => {
  return userAxios.get(`api/v1/order?page=${page}&size=${NUMBER_OF_ORDERS}`);
};
// [user] 주문 목록 조회 query
export const useOrderListData = (page: number = 0) => {
  return useQuery({
    queryKey: ['orderList', page],
    queryFn: () => fetchOrderList(page),
    keepPreviousData: true,
  });
};

// [user] 주문 상세 조회 API
const fetchOrderDetail = (
  ordersId: string,
  merchantUid: string,
): Promise<OrderDetail> => {
  return userAxios.get(
    `api/v1/order/${ordersId}?ordersId=${ordersId}&merchantUid=${merchantUid}`,
  );
};
// [user] 주문 상세 조회 query
export const useOrderDetailData = (ordersId: string, merchantUid: string) => {
  return useQuery({
    queryKey: ['orderDetail', ordersId, merchantUid],
    queryFn: () => fetchOrderDetail(ordersId, merchantUid),
    enabled: !!ordersId && !!merchantUid,
    refetchOnWindowFocus: false,
  });
};
