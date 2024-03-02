import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminAxios } from './customAxios';
import {
  AdminProductDetail,
  AdminProductList,
  AdminProductPutData,
  AdminProductUploadData,
} from '../../@types/adminProduct';
import { ObjectIndexable } from '../../@types/common';
import { NUMBER_OF_PRODUCTS } from '../constants/pageSizes';

// [admin] 상품 등록 API
export const postProductAPI = async (uploadDatas: AdminProductUploadData) => {
  if (!uploadDatas) return;

  const { productDto, productImages, thumbnail } = uploadDatas;
  const formData = new FormData();

  // 상품 정보 데이터 obj 추가
  const productDtoData = new Blob([JSON.stringify(productDto)], {
    type: 'application/json',
  });
  formData.append('productDto', productDtoData);

  // 이미지 file 추가
  productImages.forEach((file) => {
    formData.append('productImages', file);
  });

  // 썸네일 file 추가
  formData.append('thumbnail', thumbnail);

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await adminAxios.post('product', formData, config);
  return data?.productId;
};
// [admin] 상품 등록 mutation
export const useProductUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['productUpload'],
    async (data: AdminProductUploadData) => {
      const productId = await postProductAPI(data);
      return productId;
    },
    {
      onSuccess: async () => {
        return Promise.all([
          queryClient.invalidateQueries(['productList']),
          queryClient.invalidateQueries(['productDetail']),
        ]);
      },
    },
  );
};

// [admin] 상품 수정 API
export const putProductAPI = async (uploadDatas: AdminProductPutData) => {
  if (!uploadDatas) return;

  const { productDto, productImages, thumbnail } = uploadDatas;
  const formData = new FormData();

  // 상품 정보 데이터 obj 추가
  const productDtoData = new Blob([JSON.stringify(productDto)], {
    type: 'application/json',
  });
  formData.append('productDto', productDtoData);

  // 이미지 file 추가
  if (productImages.length) {
    productImages.forEach((file) => {
      formData.append('productImages', file);
    });
  }

  // 썸네일 file 추가
  if (thumbnail) {
    formData.append('thumbnail', thumbnail);
  }

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await adminAxios.put('product', formData, config);
  return data?.productId;
};
// [admin] 상품 수정 mutation
export const useProductModifyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['noticeModify'],
    async (data: AdminProductPutData) => {
      const noticeId = await putProductAPI(data);
      return noticeId;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['productList']),
          queryClient.invalidateQueries(['productDetail']),
        ]);
      },
    },
  );
};

// [admin] 상품 삭제 API
export const deleteProductAPI = async (productId: number) => {
  const res = await adminAxios.delete(`product/${productId}`);
  return res;
};
// [admin] 상품 삭제 mutation
export const useProductDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['productDelete'],
    async (productId: number) => {
      const res = await deleteProductAPI(productId);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([queryClient.invalidateQueries(['productList'])]);
      },
    },
  );
};

// [admin] 상품 품절 API
export const soldOutProductAPI = async (productId: number) => {
  const res = await adminAxios.put(`product/${productId}`);
  return res;
};
// [admin] 상품 품절 mutation
export const useProductSoldOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['productSoldOut'],
    async (productId: number) => {
      const res = await soldOutProductAPI(productId);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['productList']),
          queryClient.invalidateQueries(['productDetail']),
        ]);
      },
    },
  );
};

// [admin] 상품 품절 복구 API
export const restockProductAPI = async (productId: number) => {
  const res = await adminAxios.put(`product/${productId}/recovery`);
  return res;
};
// [admin] 상품 품절 복구 mutation
export const useProductRestockMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['productRestock'],
    async (productId: number) => {
      const res = await restockProductAPI(productId);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['productList']),
          queryClient.invalidateQueries(['productDetail']),
        ]);
      },
    },
  );
};

const STOCK_CATEGORIES = {
  all: '',
  in_stock: 'true',
  out_of_stock: 'false',
};
// [admin] 상품 목록 조회 API
const fetchAdminProductList = (
  page: number,
  category: string,
  stock: string,
): Promise<AdminProductList> => {
  return adminAxios.get(
    `product?page=${page}&size=${NUMBER_OF_PRODUCTS}&category=${category}&stock=${stock}`,
  );
};
// [admin] 상품 목록 조회 query
export const useAdminProductListData = (
  page: number,
  category: string,
  stock: string,
) => {
  const categoryCatpital = category.toUpperCase();
  const hasStock = (STOCK_CATEGORIES as ObjectIndexable)[stock];

  return useQuery({
    queryKey: ['productList', page, category, stock],
    queryFn: () => fetchAdminProductList(page, categoryCatpital, hasStock),
    enabled: !!category && !!stock,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// [admin] 상품 상세 조회 API
const fetchAdminProductDetail = (
  productId: number | null,
): Promise<AdminProductDetail> => {
  return adminAxios.get(`product/${productId}`);
};
// [admin] 상품 상세 조회 query
export const useAdminProductDetailData = (productId: number | null) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchAdminProductDetail(productId),
    enabled: !!productId,
    staleTime: 0,
  });
};
