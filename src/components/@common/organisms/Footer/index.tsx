import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default React.memo(function Footer() {
  return (
    <Container>
      <address>
        COMPANY: arffy
        <br />
        CEO: Kwon Hyoeun
        <br />
        BUSINESS REGISTRATION NUMBER: 710-06-02126
        <br />
        ADDRESS: unit 403, 118, Bulgwang-ro, Eunpyeong-gu, Seoul, Republic of
        Korea
        <br />
        EMAIL: master.arffy@gmail.com
        <br />
        TEL: 01053335459
      </address>
      <LinksContainer>
        <Link to="/info/guide">
          <span>GUIDE</span>
        </Link>
        <Link to="/info/agreement">
          <span>AGREEMENT</span>
        </Link>
        <Link to="/info/privacy">
          <span>PRIVACY</span>
        </Link>
      </LinksContainer>
    </Container>
  );
});

const Container = styled.footer`
  height: 12rem;
  padding: 32px 24px;
  background-color: var(--color-white);
  color: var(--color-gray200);
  text-align: center;
  letter-spacing: normal;
  font-size: var(--font-x-micro);
  line-height: calc(var(--font-x-micro) * 1.6);
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  @media screen and (min-width: 1024px) {
    margin-top: 120px;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
`;
