// 주문번호 조회 요청 (장바구니 페이지 이동 시 받는 데이터)
export interface OrderNumberInfo {
  ordersId: number;
  merchant_uid: string;
  amount: number;
}

interface OrderInfo {
  merchant_uid: string;
  amount: number;
}

interface ReceiverInfo {
  deliveryAddress: string;
  deliveryAddressDetail: string;
  deliveryPostCode: string;
  receiverName: string;
  receiverPhoneNumber: string;
  deliveryRequestContent: string;
}

// 주문번호 사전등록 (결제 버튼 클릭 직후 받는 데이터)
export interface OrderNumberUploadData {
  orderInfo: OrderInfo;
  receiverInfo: ReceiverInfo;
}

// 결제 시 포트원에 전송할 데이터
export interface InfoDataForPortOne {
  merchant_uid: string;
  amount: number;
  name: string;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
}

// 결제 검증 요청 데이터
export interface PaymentVerifyData {
  imp_uid: string | null;
  merchant_uid: string | null;
  status: string | undefined;
}

export interface BuyerInfo {
  name: string;
  mobile: string;
  address: string;
  addressDetail: string;
  postCode: string;
}

export interface PaymentProductInfo {
  productId: number;
  thumbnail: string;
  productName: string;
  price: number;
  discountPrice: number;
}

interface PriceInfo {
  originTotalPrice: number;
  totalDiscountPrice: number;
  discountedPrice: number;
}

interface PaymentInfoData {
  orderId: number;
  buyerInfo: BuyerInfo;
  productsInfo: PaymentProductInfo[];
  priceInfo: PriceInfo;
}

// 주문 페이지 관련 정보 조회
export interface PaymentInfo {
  data: PaymentInfoData;
}
