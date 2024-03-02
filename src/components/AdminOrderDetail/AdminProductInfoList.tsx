import React from 'react';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import AdminOrderProductList from '../AdminOrderList/AdminOrderProductList';
import { AdminOrderDeliveryInfo } from '../../@types/adminOrder';

interface ProductInfo {
  ordersId: number;
  ordersDetailId: number;
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  thumbnail: string;
  delivery?: AdminOrderDeliveryInfo;
}

interface ProductInfoListProps {
  productList: ProductInfo[];
}

export default React.memo(function AdminProductInfoList({
  productList,
}: ProductInfoListProps) {
  return (
    <CollapsibleContainer
      label="주문상품"
      preview={
        productList.length === 1
          ? productList[0].productName
          : `${productList[0].productName} 외 ${productList.length - 1}개`
      }
    >
      <AdminOrderProductList productList={productList} />
    </CollapsibleContainer>
  );
});
