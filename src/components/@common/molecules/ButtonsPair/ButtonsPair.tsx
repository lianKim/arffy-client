import { useIsMutating } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonsPairProps {
  onClickPrimaryButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickSecondaryButton?: React.MouseEventHandler<HTMLButtonElement>;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  active?: boolean;
  warning?: boolean;
}

export default React.memo(function ButtonsPair({
  primaryButtonText,
  secondaryButtonText,
  onClickPrimaryButton,
  onClickSecondaryButton,
  active = false,
  warning = false,
}: ButtonsPairProps) {
  const isMutating = useIsMutating();

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <CancelButton
        onClick={onClickSecondaryButton || handleGoBack}
        active={active}
        warning={warning}
      >
        {secondaryButtonText || '취소'}
      </CancelButton>
      <SubmitButton
        onClick={onClickPrimaryButton}
        active={active}
        warning={warning}
        disabled={!!isMutating}
      >
        {primaryButtonText || '등록'}
      </SubmitButton>
    </Container>
  );
});

interface ButtonProps {
  active: boolean;
  warning?: boolean;
}

const Container = styled.div`
  width: 100%;

  & button {
    width: 50%;
    height: 37px;
  }
`;

const CancelButton = styled.button<ButtonProps>`
  border: 1px solid
    ${(props) =>
      props.active
        ? props.warning
          ? 'var(--color-orange)'
          : 'var(--color-navy)'
        : 'var(--color-gray200)'};
  background-color: white;
  color: ${(props) =>
    props.active
      ? props.warning
        ? 'var(--color-orange)'
        : 'var(--color-navy)'
      : 'var(--color-gray300)'};
`;

const SubmitButton = styled.button<ButtonProps>`
  border: 0;
  background-color: ${(props) =>
    props.active
      ? props.warning
        ? 'var(--color-orange)'
        : 'var(--color-navy)'
      : 'var(--color-gray200)'};
  color: var(--color-white);
`;
