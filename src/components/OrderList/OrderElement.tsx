import React from 'react';
import styled from 'styled-components';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import OrderNumber from './OrderNumber';
import OrderProductList from './OrderProductList';
import { OrderProductInfo } from '../../@types/order';

interface OrderElementProps {
  merchantUid: string;
  ordersId: number;
  productList: OrderProductInfo[];
}

export default React.memo(function OrderElement({
  merchantUid,
  ordersId,
  productList,
}: OrderElementProps) {
  return (
    <>
      {productList.length > 0 && (
        <Container>
          <OrderNumber merchantUid={merchantUid} />
          <OrderProductList productList={productList} noProductLink />
        </Container>
      )}
    </>
  );
});

const Container = styled.div`
  margin-bottom: 60px;
`;
