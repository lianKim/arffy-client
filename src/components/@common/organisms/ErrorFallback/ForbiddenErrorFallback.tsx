import React from 'react';
import { RiForbid2Line } from '@react-icons/all-files/ri/RiForbid2Line';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  message?: string | false | undefined;
  onResetError: () => void;
}

export default function ForbiddenErrorFallback({
  message,
  onResetError,
}: ErrorPageProps) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    onResetError();
  };

  return (
    <Container>
      <button type="button">
        <StyledForbiddenIcon />
      </button>
      <ErrorMessage>{message || '접근 권한이 없습니다.'}</ErrorMessage>
      <GoBackButton type="button" onClick={handleGoBack}>
        이전 페이지로
      </GoBackButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 9999;
  overflow: hidden;
`;

const StyledForbiddenIcon = styled(RiForbid2Line)`
  font-size: 36px;
  color: var(--color-gray300);
`;

const ErrorMessage = styled.p`
  color: var(--color-gray300);
  white-space: pre-wrap;
  text-align: center;
  margin-top: 6px;
  line-height: 1.5;
`;

const GoBackButton = styled.button`
  background-color: var(--color-orange);
  color: var(--color-white);
  padding: 2px 4px 1px 3px;
  margin-top: 24px;
`;
