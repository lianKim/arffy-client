import React from 'react';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import styled from 'styled-components';
import DeliveryStatus from './DeliveryStatus';
import { REFUND_STATUS_OBJ } from '../../lib/constants/refund';
import { OrderProductInfo } from '../../@types/order';
import { ObjectIndexable } from '../../@types/common';

interface OrderProductListProps {
  productList: OrderProductInfo[];
  noProductLink?: boolean;
}

export default React.memo(function OrderProductList({
  productList,
  noProductLink,
}: OrderProductListProps) {
  return (
    <ProductList>
      {productList.map((product) => (
        <ProductInfo
          productName={product.productName}
          price={product.price}
          discountPrice={product.discountPrice}
          thumbnail={product.thumbnail}
          productId={product.productId}
          key={product.ordersDetailId}
          noLink={noProductLink}
        >
          {/* 반품 사유가 있으면 반품 처리 상태, 없으면 배송 상태 보여주기 */}
          {!!product.cancelReason && !!product.refundStatus ? (
            <RefundStatus>
              {(REFUND_STATUS_OBJ as ObjectIndexable)[product.refundStatus]}
            </RefundStatus>
          ) : (
            <DeliveryStatus deliveryInfo={product.delivery} />
          )}
        </ProductInfo>
      ))}
    </ProductList>
  );
});

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RefundStatus = styled.div`
  color: var(--color-orange);
  font-weight: 500;
`;
