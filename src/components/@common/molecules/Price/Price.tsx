import React from 'react';
import styled, { css } from 'styled-components';
import { insertCommas } from '../../../../utils/handleCommas';

interface PriceProps {
  price: number;
  discountPrice: number;
  verticalCenter?: boolean;
  fontSize?: string;
}

export default React.memo(function Price({
  price,
  discountPrice,
  verticalCenter,
  fontSize,
}: PriceProps) {
  return (
    <Container verticalCenter={verticalCenter} fontSize={fontSize}>
      <OriginalPrice isDiscounted={discountPrice !== price}>
        <span>KRW {insertCommas(price)}</span>
      </OriginalPrice>
      {discountPrice !== price && (
        <DiscountPrice>
          <span>KRW {insertCommas(discountPrice)}</span>
        </DiscountPrice>
      )}
    </Container>
  );
});

interface ContainerProps {
  verticalCenter?: boolean;
  fontSize?: string;
}

interface OriginalPriceProps {
  isDiscounted?: boolean;
}

const Container = styled.div<ContainerProps>`
  letter-spacing: normal;
  font-size: ${(props) => props.fontSize || 'var(--font-x-micro)'};
  ${(props) =>
    props.verticalCenter &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `};
`;

const OriginalPrice = styled.div<OriginalPriceProps>`
  position: relative;
  display: inline-block;
  color: ${(props) =>
    props.isDiscounted ? 'var(--color-gray200)' : 'var(--color-navy)'};
  text-decoration: ${(props) => (props.isDiscounted ? 'line-through' : 'none')};
`;

const DiscountPrice = styled.div`
  margin-top: 5px;
`;
