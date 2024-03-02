import React, { useEffect, useState } from 'react';
import LogoAnimation from '../../../../assets/gif/logo_animation_roation4.gif';
import styled from 'styled-components';

export default React.memo(function LoadingSpinner() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(true), 200);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <Wrapper>
      <Container>
        <AnimationGif src={LogoAnimation} alt="loading..." />
        <LoadingText>...Loading...</LoadingText>
      </Container>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background: white;
  z-index: 9995;
`;

const Container = styled.div`
  position: relative;
  top: -32px;
`;

const LoadingText = styled.div`
  letter-spacing: normal;
  color: var(--color-gray300);
  text-align: center;
  margin-top: 4px;
`;

const AnimationGif = styled.img`
  margin: 0 auto;
  object-fit: cover;
  width: 80px;
`;
