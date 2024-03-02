import React from 'react';
import styled from 'styled-components';
import Price from '../@common/molecules/Price/Price';
import SoldOutMark from '../@common/atoms/SoldOutMark/SoldOutMark';

interface TitleAndPriceProps {
  title: string;
  price: number;
  discountPrice: number;
  soldOut: boolean;
}

export default React.memo(function TitleAndPrice({
  title,
  price,
  discountPrice,
  soldOut,
}: TitleAndPriceProps) {
  return (
    <Container>
      <ProductName>{title}</ProductName>
      <Price
        price={price}
        discountPrice={discountPrice}
        fontSize="var(--font-micro)"
      />
      {soldOut && <SoldOutMark />}
    </Container>
  );
});

const Container = styled.div`
  letter-spacing: normal;
  white-space: normal;
`;

const ProductName = styled.h2`
  font-size: var(--font-small);
  line-height: 1.6;
  margin-bottom: 14px;
`;
