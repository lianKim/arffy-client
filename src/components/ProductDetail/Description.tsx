import React from 'react';
import styled from 'styled-components';

interface IProps {
  description: string;
}

export default React.memo(function Description({ description }: IProps) {
  return (
    <Container>
      <Divider />
      <Content>{description}</Content>
    </Container>
  );
});

const Container = styled.div`
  word-break: keep-all;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }
`;

const Divider = styled.div`
  width: 14px;
  height: 1px;
  background-color: var(--color-navy);
  margin-bottom: 14px;
`;

const Content = styled.p`
  white-space: pre-wrap;
  line-height: 1.6;
`;
