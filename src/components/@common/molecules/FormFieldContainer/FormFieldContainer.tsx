import React from 'react';
import styled from 'styled-components';
import { RiErrorWarningLine } from '@react-icons/all-files/ri/RiErrorWarningLine';

interface FormFieldContainerProps {
  label: string;
  children: React.ReactNode;
  errorMessage?: string;
}

export default React.memo(function FormFieldContainer({
  label,
  children,
  errorMessage,
}: FormFieldContainerProps) {
  return (
    <Container>
      <Label>{label}</Label>
      {children}
      {errorMessage && (
        <ErrorMessageContainer>
          <ErrorIcon />
          <span>{errorMessage}</span>
        </ErrorMessageContainer>
      )}
    </Container>
  );
});

const Container = styled.div`
  position: relative;

  & input,
  select,
  textarea {
    width: 100%;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
  letter-spacing: normal;
  font-size: var(--font-x-micro);
  font-weight: var(--weight-semi-bold);
`;

const ErrorMessageContainer = styled.div`
  color: var(--color-orange);
  display: flex;
  align-items: center;
  gap: 2px;
  position: absolute;
  top: -3px;
  right: 0;
`;

const ErrorIcon = styled(RiErrorWarningLine)`
  font-size: 16px;
`;
