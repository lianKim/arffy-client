import React from 'react';
import styled from 'styled-components';
import { hasFinalConsonant } from '../../../../utils/checkString';

interface NoPostMessageProps {
  type?: string;
  message?: string;
  children?: React.ReactNode;
}

export default React.memo(function NoContentMessage({
  message,
  type = '게시글',
  children,
}: NoPostMessageProps) {
  return (
    <Container>
      <Message>
        {message ||
          `등록된 ${type + (hasFinalConsonant(type) ? '이' : '가')} 없습니다.`}
      </Message>
      {children}
    </Container>
  );
});

const Container = styled.div`
  position: absolute;
  top: 50vh;
  left: 5vw;
  width: 90vw;
  height: 50vh;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Message = styled.div`
  color: var(--color-gray200);
  text-align: center;
`;
