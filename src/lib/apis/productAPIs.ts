import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import { ProductDetail, ProductList } from '../../@types/product';
import { NUMBER_OF_PRODUCTS } from '../constants/pageSizes';

// [user] 상품 목록 조회 API
export const fetchProductList = (
  category: string,
  page: number,
): Promise<ProductList> => {
  return userAxios.get(
    `api/v1/product?page=${page}&size=${NUMBER_OF_PRODUCTS}&category=${category}`,
  );
};
// [user] 상품 목록 조회 query
export const useProductListData = (
  category: string = 'all',
  page: number = 0,
) => {
  return useQuery({
    queryKey: ['productList', category, page],
    queryFn: () => fetchProductList(category.toUpperCase(), Number(page)),
    enabled: !!category && typeof page === 'number',
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
// [user] 상품 목록 조회 prefetch query (landing page)
export const usePrefetchProductList = (
  category: string = 'all',
  page: number = 0,
) => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['productList'],
    queryFn: () => fetchProductList(category.toUpperCase(), Number(page)),
  });
};

// [user] 상품 상세 조회 API
const fetchProductDetail = (productId: number): Promise<ProductDetail> => {
  return userAxios.get(`api/v1/product/${productId}`);
};
// [user] 상품 상세 조회 query
export const useProductDetailData = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
    staleTime: 0,
  });
};
