import { AdminApiPageInfo } from './adminCommon';

// [admin] 운송장번호 등록 데이터
export interface AdminTrackingNumberUploadData {
  ordersId: number;
  ordersDetailId: number;
  deliveryCarrier: string;
  trackingNumber: string;
}

// [admin] 운송장번호 수정 데이터
export interface AdminTrackingNumberModifyData
  extends AdminTrackingNumberUploadData {
  deliveryId: number;
}

export interface AdminProductRefundDetail {
  ordersDetailId: number;
  cancelReason: string;
  cancelReasonContent: string;
}

// [admin] 반품 요청 데이터
export interface AdminProductRefundData {
  ordersId: number;
  merchantUid: string;
  refundProductList: AdminProductRefundDetail[];
}

export interface AdminOrderDeliveryInfo {
  deliveryId: number;
  deliveryStatus: string;
  deliveryCarrier: string;
  trackingNumber: string;
}

export interface AdminOrderProductInfo {
  ordersId: number;
  ordersDetailId: number;
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  thumbnail: string;
  delivery?: AdminOrderDeliveryInfo;
  refundStatus?: string;
  cancelReason?: string;
  cancelReasonContent?: string;
}

interface AdminOrder {
  ordersId: number;
  merchantUid: string;
  orderStatus: string;
  productList: AdminOrderProductInfo[];
}

interface AdminOrderListData extends AdminApiPageInfo {
  content: AdminOrder[];
}

// [admin] 주문내역 목록 조회
export interface AdminOrderList {
  data: AdminOrderListData;
}

interface AdminOrderDetailData {
  ordersId: number;
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
  payMethod: string;
  pgProvider: string;
  orderStatus: string;
  productList: AdminOrderDetailProductInfo[];
}

// [admin] 주문내역 상세 조회
export interface AdminOrderDetail {
  data: AdminOrderDetailData;
}

interface AdminOrderDetailProductInfo {
  ordersId: number;
  ordersDetailId: number;
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  thumbnail: string;
  delivery: AdminOrderDetailDeliveryInfo;
}

interface AdminOrderDetailDeliveryInfo {
  deliveryId: number;
  deliveryStatus: string;
  deliveryCarrier: string;
  trackingNumber: string;
}

export interface RefundableProduct {
  ordersDetailId: number;
  ordersId: number;
  productId: number;
  productOrderCount: number;
  productName: string;
  thumbnail: string;
  originPrice: number;
  discountPrice: number;
  discountRate: number;
  refundStatus?: string;
}

// [admin] 반품 가능한 상품 조회
export interface AdminRefundableProductList {
  data: RefundableProduct[];
}
