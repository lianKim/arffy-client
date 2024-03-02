import React from 'react';
import styled from 'styled-components';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import { PaymentProductInfo } from '../../@types/payment';

interface PaymentProductsProps {
  productList: PaymentProductInfo[];
}

export default React.memo(function PaymentProducts({
  productList,
}: PaymentProductsProps) {
  return (
    <>
      {productList?.length > 0 && (
        <CollapsibleContainer
          label="주문상품"
          preview={
            productList.length === 1
              ? productList[0].productName
              : `${productList[0].productName} 외 ${productList.length - 1}개`
          }
        >
          <ProductsContainer>
            {productList.map((product) => (
              <ProductInfo
                productName={product.productName}
                price={product.price}
                discountPrice={product.discountPrice}
                thumbnail={product.thumbnail}
                productId={product.productId}
                key={product.productId}
              />
            ))}
          </ProductsContainer>
        </CollapsibleContainer>
      )}
    </>
  );
});

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
