import React from 'react';
import styled from 'styled-components';
import OrderNumber from '../OrderList/OrderNumber';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import AdminOrderProductList from '../AdminOrderList/AdminOrderProductList';
import { AdminOrderProductInfo } from '../../@types/adminOrder';

interface OrderElementProps {
  merchantUid: string;
  ordersId: number;
  productList: AdminOrderProductInfo[];
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
          <AdminOrderProductList productList={productList} noProductLink />
        </Container>
      )}
    </>
  );
});

const Container = styled.div`
  margin-bottom: 60px;
`;
