import { UserApiPageInfo } from './userCommon';

export interface DeliveryInfo {
  deliveryId: number;
  deliveryStatus: string;
  deliveryCarrier: string;
  trackingNumber: string;
}

export interface OrderProductInfo {
  ordersId: number;
  ordersDetailId: number;
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  thumbnail: string;
  delivery?: DeliveryInfo;
  requestCancelledAt?: string;
  cancelReason?: string;
  cancelReasonContent?: string;
  refundStatus?: string;
}

interface Order {
  ordersId: number;
  merchantUid: string;
  orderStatus: string;
  productList: OrderProductInfo[];
}

interface OrderListData {
  totalPages: number;
  totalElements: number;
  size: number;
  pageable: UserApiPageInfo;
  content: Order[];
}

// 주문내역 목록 조회
export interface OrderList {
  data: OrderListData;
}

interface OrderDetailData {
  merchantUid: string;
  receiverName: string;
  receiverPhoneNumber: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  deliveryPostCode: string;
  deliveryRequestContent?: string;
  originTotalPrice: number;
  totalDiscountPrice: number;
  discountedPrice: number;
  orderStatus: string;
  productList: OrderProductInfo[];
  payMethod: string;
  pgProvider: string;
}

// 주문내역 상세 조회
export interface OrderDetail {
  data: OrderDetailData;
}
