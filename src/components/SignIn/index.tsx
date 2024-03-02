import React from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import { useLocation } from 'react-router-dom';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default React.memo(function SignIn() {
  const { state } = useLocation();
  sessionStorage.setItem(
    'prev_url',
    state?.prevUrl || `${VITE_CLIENT_BASE_URL}/product`,
  );

  return (
    <Container>
      <TitleContainer>
        <Title>로그인</Title>
        <span>또는</span>
        <Title>회원가입</Title>
      </TitleContainer>
      <KakaoOnlyMessage>
        현재는 카카오 계정을 통한 로그인만 지원하고 있습니다.
      </KakaoOnlyMessage>
      <KakaoLogin />
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.span`
  font-size: var(--font-small);
  font-weight: 500;
`;

const KakaoOnlyMessage = styled.p`
  color: var(--color-gray200);
  margin-top: 10px;
`;
