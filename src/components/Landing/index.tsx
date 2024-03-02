import React, { useEffect } from 'react';
import styled from 'styled-components';
import LogoSymbol from '../../assets/logo/logo_symbol.svg';
import { Link } from 'react-router-dom';

export default React.memo(function Landing() {
  // 랜딩 페이지 스크롤 방지 (PG사 심사 후 주석 해제)
  // useEffect(() => {
  //   document.body.style.cssText = `
  //       position: fixed;
  //       top: -${window.scrollY}px;
  //       overflow-y: scroll;
  //       width: 100%;
  //     `;

  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = '';
  //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  //   };
  // }, []);

  return (
    <Link to="/product">
      <Container>
        <LogoContainer>
          <img src={LogoSymbol} alt="logo" />
        </LogoContainer>
      </Container>
    </Link>
  );
});

const Container = styled.div`
  background-color: var(--color-orange);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const LogoContainer = styled.div`
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: 1024px) {
    width: 30vw;
    top: calc(50% + 16px);
  }

  & img {
    width: 100%;
    object-fit: cover;
  }
`;
