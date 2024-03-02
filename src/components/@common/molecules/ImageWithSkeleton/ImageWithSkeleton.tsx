import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface ImageWithSkeletonProps {
  src: string;
  onClick?: () => void;
}

export default React.memo(function ImageWithSkeleton({
  src,
  onClick,
}: ImageWithSkeletonProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <Container onClick={onClick}>
      {!isImageLoaded && <ThumbSkeleton />}
      <ThumbImg src={src} alt="thumb" onLoad={() => setIsImageLoaded(true)} />
    </Container>
  );
});

const Container = styled.button`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-gray100);
  z-index: 2;
  position: relative;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;
