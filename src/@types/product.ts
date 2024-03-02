import { UserApiPageInfo, UserApiSortInfo } from './userCommon';

interface ProductCardList {
  thumbnail: string;
  productName: string;
  price: number;
  discountPrice: number;
  productId: number;
  quantity: number;
}

interface ProductListData {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ProductCardList[];
  number: number;
  sort: UserApiSortInfo;
  pageable: UserApiPageInfo;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 상품 목록 조회
export interface ProductList {
  data: ProductListData;
}

interface ProductDetailData {
  imageUrls: string[];
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  quantity: number;
  description: string;
  period: string;
  country: string;
  width?: string;
  depth?: string;
  height?: string;
  minLineHeight?: string;
  maxLineHeight?: string;
  material: string;
  condition: string;
}

// 상품 상세 조회
export interface ProductDetail {
  data: ProductDetailData;
}
