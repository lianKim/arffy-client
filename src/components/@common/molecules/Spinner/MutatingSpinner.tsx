import React, { useEffect, useState } from 'react';
import LogoAnimation from '../../../../assets/gif/logo_animation_roation4.gif';
import styled from 'styled-components';
import { useIsMutating } from '@tanstack/react-query';

export default function MutatingSpinner() {
  const isMutating = useIsMutating();
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<string>('0');

  useEffect(() => {
    if (!isMutating) return;

    const timeoutId = setTimeout(() => setLoading(true), 200);

    return () => clearTimeout(timeoutId);
  }, [isMutating]);

  // 스크롤 방지 (화면 고정)
  useEffect(() => {
    if (!loading) return;

    setScrollY(`${window.scrollY}px`);
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
      `;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [loading]);

  return (
    <>
      {!!isMutating && (
        <Container scrollY={scrollY}>
          <AnimationGif src={LogoAnimation} alt="loading..." />
          <LoadingText>...Loading...</LoadingText>
        </Container>
      )}
    </>
  );
}

interface ContainerProps {
  scrollY: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  top: ${(props) => props.scrollY};
  left: 0;
  background: rgba(18, 18, 18, 0.8);
`;

const AnimationGif = styled.img`
  margin: 0 auto;
  object-fit: cover;
  width: 80px;
`;

const LoadingText = styled.div`
  letter-spacing: normal;
  color: var(--color-gray300);
  text-align: center;
  margin-top: 4px;
`;
