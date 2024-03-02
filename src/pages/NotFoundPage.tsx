import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo/logo_symbol_empty.svg';

export default function NotFoundPage() {
  const handleGoBack = () => {
    history.back();
  };

  return (
    <Container>
      <ErrorMessageContainer>
        <LogoContainer>
          <img src={Logo} />
        </LogoContainer>
        <ErrorMessage>
          죄송합니다.
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </ErrorMessage>
        <GoBackButton type="button" onClick={handleGoBack}>
          이전 페이지로
        </GoBackButton>
      </ErrorMessageContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 9999;
`;

const ErrorMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 30vw;

  & img {
    width: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 20px;
  font-weight: 500;
  text-align: center;
  line-height: calc(var(--font-micro) * 1.6);
  color: var(--color-gray200);
`;

const GoBackButton = styled.button`
  background-color: var(--color-orange);
  color: var(--color-white);
  padding: 2px 4px 1px 3px;
  margin-top: 24px;
`;
