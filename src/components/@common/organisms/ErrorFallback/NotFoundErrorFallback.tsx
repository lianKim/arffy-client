import React from 'react';
import { AiOutlineRedo } from '@react-icons/all-files/ai/AiOutlineRedo';
import { BiRevision } from '@react-icons/all-files/bi/BiRevision';
import { RiForbid2Line } from '@react-icons/all-files/ri/RiForbid2Line';
import { GrLinkPrevious } from '@react-icons/all-files/gr/GrLinkPrevious';
import { MdErrorOutline } from '@react-icons/all-files/md/MdErrorOutline';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  message?: string | false | undefined;
  height?: string;
  onResetError: () => void;
}

export default function NotFoundErrorFallback({
  message,
  height,
  onResetError,
}: ErrorPageProps) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    onResetError();
  };

  return (
    <Container height={height}>
      <button type="button">
        <StyledErrorIcon />
      </button>
      <ErrorMessage>
        {message || '해당 게시글을 찾을 수 없습니다.'}
      </ErrorMessage>
      <GoBackButton type="button" onClick={handleGoBack}>
        이전 페이지로
      </GoBackButton>
    </Container>
  );
}

interface ContainerProps {
  height?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => props.height || '100vh'};
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

const StyledErrorIcon = styled(MdErrorOutline)`
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
