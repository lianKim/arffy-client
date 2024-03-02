interface CartItem {
  cartId: number;
  productId: number;
  thumbnail: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  quantity: number;
}

interface CartData {
  cartList: CartItem[];
  totalPrice: number;
  totalDiscountPrice: number;
}

// 장바구니 조회
export interface Cart {
  data: CartData;
}
