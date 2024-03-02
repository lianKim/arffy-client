import React from 'react';
import AdminDeliveryStatus from './AdminDeliveryStatus';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import styled from 'styled-components';
import {
  REFUND_REASONS_OBJ2,
  REFUND_STATUS_OBJ,
} from '../../lib/constants/refund';
import { useNavigate } from 'react-router-dom';
import { ObjectIndexable } from '../../@types/common';
import { AdminOrderProductInfo } from '../../@types/adminOrder';

interface OrderProductListProps {
  productList: AdminOrderProductInfo[];
  noProductLink?: boolean;
}

export default React.memo(function AdminOrderProductList({
  productList,
  noProductLink,
}: OrderProductListProps) {
  const navigate = useNavigate();
  const handleRefundClick = () => {
    navigate('refund');
  };

  return (
    <>
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
            <DeliveryAndRefundContainer>
              {/* 반품 사유가 있으면 반품 처리 상태, 없으면 배송 상태 보여주기 */}
              {!!product.cancelReason && !!product.refundStatus ? (
                <div>
                  <RefundStatus>
                    {
                      (REFUND_STATUS_OBJ as ObjectIndexable)[
                        product.refundStatus
                      ]
                    }
                  </RefundStatus>
                  <RefundReason>
                    {
                      (REFUND_REASONS_OBJ2 as ObjectIndexable)[
                        product.cancelReason
                      ]
                    }
                    {product.cancelReasonContent &&
                      ` - ${product.cancelReasonContent}`}
                  </RefundReason>
                </div>
              ) : (
                <>
                  <AdminDeliveryStatus
                    deliveryInfo={product.delivery}
                    ordersId={product.ordersId}
                    ordersDetailId={product.ordersDetailId}
                  />
                  <NavRefundButton type="button" onClick={handleRefundClick}>
                    반품 처리
                  </NavRefundButton>
                </>
              )}
            </DeliveryAndRefundContainer>
          </ProductInfo>
        ))}
      </ProductList>
    </>
  );
});

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DeliveryAndRefundContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const NavRefundButton = styled.button`
  font-size: var(--font-x-micro);
  font-weight: 500;
  background-color: white;
  border: 1px solid var(--color-gray300);
  color: var(--color-gray300);
  height: 22px;
  padding: 0 calc(var(--font-micro) / 2);
`;

const RefundStatus = styled.div`
  color: var(--color-orange);
  font-weight: 500;
`;

const RefundReason = styled.div`
  margin-top: 8px;
  color: var(--color-gray300);
`;
