import React from 'react';
import { KAKAO_AUTH_URL } from '../../lib/constants/oauth';
import KakaoLoginImage from '../../assets/images/kakao_login_large_wide.png';
import styled from 'styled-components';

export default function KakaoLogin() {
  const handleKakaoLoginButton = () => {
    window.location.replace(KAKAO_AUTH_URL);
  };

  return (
    <KakaoLoginButton type="button" onClick={handleKakaoLoginButton}>
      <img src={KakaoLoginImage} alt="카카오 로그인" />
    </KakaoLoginButton>
  );
}

const KakaoLoginButton = styled.button`
  width: 80%;
  margin-top: 32px;
  max-width: 18rem;

  & img {
    width: 100%;
  }
`;
