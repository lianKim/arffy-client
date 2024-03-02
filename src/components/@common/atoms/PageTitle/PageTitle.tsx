import React from 'react';
import styled from 'styled-components';

interface PageTitleProps {
  title: string;
  subTitle?: string;
}

export default React.memo(function PageTitle({
  title,
  subTitle,
}: PageTitleProps) {
  return (
    <Container>
      <Title>{title}</Title>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </Container>
  );
});

const Container = styled.div`
  margin-bottom: 42px;
  letter-spacing: normal;
`;

const Title = styled.div`
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  letter-spacing: normal;
  text-align: center;
`;

const SubTitle = styled.div`
  margin-top: 8px;
  /* color: var(--color-gray300); */
  text-align: center;
  /* font-size: var(--font-x-micro); */
`;
