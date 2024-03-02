import { AdminApiPageInfo, AdminApiImageInfo } from './adminCommon';

interface AdminProductUploadDto {
  category: string;
  productName: string;
  price: string;
  discountRate: string;
  period: string;
  country: string;
  width?: string;
  depth?: string;
  height?: string;
  minLineHeight?: string;
  maxLineHeight?: string;
  material: string;
  condition: string;
  description: string;
  imageType: string;
}

// [admin] 상품 등록 요청 데이터
export interface AdminProductUploadData {
  productDto: AdminProductUploadDto;
  productImages: File[];
  thumbnail: File;
}

interface AdminProductPutDto extends AdminProductUploadDto {
  productId: number;
  deleteImages?: number[];
}

// [admin] 상품 수정 요청 데이터
export interface AdminProductPutData {
  productDto: AdminProductPutDto;
  productImages: File[];
  thumbnail?: File;
}

interface AdminProductCardList {
  thumbnail: string;
  productName: string;
  price: number;
  discountPrice: number;
  productId: number;
  quantity: number;
  category: string;
  discountRate: number;
  period: string;
  country: string;
  width?: string;
  depth?: string;
  height?: string;
  minLineHeight?: string;
  maxLineHeight?: string;
  material: string;
  condition: string;
  description: string;
  createAt: string;
}

interface AdminProductListData extends AdminApiPageInfo {
  content: AdminProductCardList[];
}

// [admin] 상품 목록 조회
export interface AdminProductList {
  data: AdminProductListData;
}

export interface AdminProductImage extends AdminApiImageInfo {
  imageType: 'PRODUCT';
}

interface AdminProductDetailData {
  productId: number;
  category: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: 0;
  period: string;
  country: string;
  width?: string;
  depth?: string;
  height?: string;
  minLineHeight?: string;
  maxLineHeight?: string;
  material: string;
  condition: string;
  description: string;
  quantity: number;
  createAt: string;
  imageList: AdminProductImage[];
  thumbnail: string;
}

// admin 상품 상세 조회
export interface AdminProductDetail {
  data: AdminProductDetailData;
}
