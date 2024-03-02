import React from 'react';
import styled from 'styled-components';

export default React.memo(function ProductInfo() {
  return (
    <Contents>
      <ImageContainer>
        <img src="" alt="product image" />
      </ImageContainer>
      <InfoContainer>
        <div>Mushroom Table Lamp for Meblo Guzzini by Luigi Massoni</div>
        <div>
          <span>KRW</span>
          <span>120,000</span>
        </div>
      </InfoContainer>
    </Contents>
  );
});

const Contents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  gap: 16px;
  border: 1px solid var(--color-gray100);
  border-bottom: 0;
`;

const ImageContainer = styled.div`
  width: calc((100vw - 48px) * 0.3);
  height: calc(((100vw - 48px) * 0.3) * 1.5);
  background: var(--color-gray100);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  width: calc((100vw - 48px) * 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1.4;
  letter-spacing: normal;

  & span {
    margin-right: 4px;
  }
`;
