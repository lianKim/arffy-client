import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Price from '../../molecules/Price/Price';
import SoldOutMark from '../../atoms/SoldOutMark/SoldOutMark';
import ImageWithSkeleton from '../../molecules/ImageWithSkeleton/ImageWithSkeleton';

interface ProductCardProps {
  thumbnail: string;
  productName: string;
  price: number;
  discountPrice: number;
  productId: number;
  soldOut?: boolean;
}

export default React.memo(function ProductCard({
  productId,
  thumbnail,
  productName,
  price,
  discountPrice,
  soldOut,
}: ProductCardProps) {
  const navigate = useNavigate();

  const handleProductCardClick = useCallback(() => {
    navigate(`${productId}`);
  }, [productId]);

  return (
    <Container>
      <ThumbnailWrapper>
        <ImageWithSkeleton src={thumbnail} onClick={handleProductCardClick} />
      </ThumbnailWrapper>
      <ProductName onClick={handleProductCardClick}>{productName}</ProductName>
      <Price price={price} discountPrice={discountPrice} verticalCenter />
      {soldOut && <SoldOutMark />}
    </Container>
  );
});

const Container = styled.div`
  width: calc((90vw - 16px) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc((90vw - 32px) / 3);
  }

  /* PC */
  @media screen and (min-width: 1024px) {
    width: calc((90vw - 72px) / 4);
  }
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  height: calc(((90vw - 16px) / 2) * 1.5);

  /* Tablet */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: calc(((90vw - 32px) / 3) * 1.5);
  }

  /* PC */
  @media screen and (min-width: 1024px) {
    height: calc(((90vw - 72px) / 4) * 1.5);
  }
`;

const ProductName = styled.button`
  display: block;
  width: 100%;
  margin-top: 10px;
  white-space: pre-line;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  font-size: var(--font-x-micro);
  font-weight: 500;
  margin-bottom: 12px;
`;
