import React from 'react';
import styled, { css } from 'styled-components';
import Price from '../../molecules/Price/Price';
import { useNavigate } from 'react-router-dom';
import SoldOutMark from '../../atoms/SoldOutMark/SoldOutMark';
import ImageWithSkeleton from '../../molecules/ImageWithSkeleton/ImageWithSkeleton';

interface ProductInfoProps {
  productName: string;
  price: number;
  discountPrice: number;
  thumbnail?: string;
  soldOut?: boolean;
  productId?: number;
  children?: React.ReactNode;
  noLink?: boolean;
}

export default React.memo(function ProductInfo({
  productName,
  price,
  discountPrice,
  thumbnail,
  soldOut,
  productId,
  children,
  noLink,
}: ProductInfoProps) {
  const navigate = useNavigate();

  const handleThumbOrNameClick = () => {
    if (!productId || noLink) return;
    navigate(`/product/${productId}`);
  };

  return (
    <Container soldOut={soldOut}>
      <ThumbnailContainer>
        <ImageWithSkeleton
          src={thumbnail || ''}
          onClick={handleThumbOrNameClick}
        />
      </ThumbnailContainer>
      <InfoContainer hasChildren={!!children}>
        <ProductNameAndPrice hasChildren={!!children}>
          <ProductNameButton onClick={handleThumbOrNameClick}>
            {productName}
          </ProductNameButton>
          <PriceContainer>
            <Price price={price} discountPrice={discountPrice} />
            {soldOut && <SoldOutMark />}
          </PriceContainer>
        </ProductNameAndPrice>
        {!!children && <ChildrenContainer>{children}</ChildrenContainer>}
      </InfoContainer>
    </Container>
  );
});

interface ContainerProps {
  soldOut?: boolean;
}

interface InfoContainerProps {
  hasChildren?: boolean;
}

interface ProductNameAndPriceProps {
  hasChildren?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  position: relative;

  ${(props) =>
    props.soldOut &&
    css`
      & * {
        color: var(--color-gray300);
      }

      & img {
        opacity: 0.6;
      }
    `};
`;

const ThumbnailContainer = styled.div`
  width: calc(90vw * 0.3);
  height: calc((90vw * 0.3) * 1.5);

  @media screen and (min-width: 1024px) {
    width: calc(200px * 0.66666667);
    height: 200px;
  }
`;

const ImageContainerButton = styled.button`
  width: calc(90vw * 0.3);
  height: calc((90vw * 0.3) * 1.5);
  /* min-height: 150px; */
  background: var(--color-gray100);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div<InfoContainerProps>`
  /* width: calc((90vw * 0.7)); */
  /* width: calc(100% - (90vw * 0.3)); */
  width: calc(100% - (90vw * 0.3));
  letter-spacing: normal;

  ${(props) =>
    props.hasChildren &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `};

  @media screen and (min-width: 1024px) {
    width: calc(100% - (200px * 0.66666667));
  }
`;

const ProductNameAndPrice = styled.div<ProductNameAndPriceProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) =>
    props.hasChildren
      ? css`
          gap: 16px;
        `
      : css`
          height: 100%;
        `};
`;

const ProductNameButton = styled.button`
  display: block;
  text-align: left;
  font-size: var(--font-micro);
  line-height: 1.6;
  /* margin-bottom: 16px; */
`;

const PriceContainer = styled.div`
  /*  */
`;

const ChildrenContainer = styled.div`
  /* margin-top: var(--font-micro); */
`;
