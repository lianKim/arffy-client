import { useIsMutating } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  /** 버튼 안의 내용 */
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 주요 버튼 여부 */
  primary?: boolean;
  /** 활성화 여부 */
  active?: boolean;
  /** Margin */
  marginTop?: string;
  marginBottom?: string;
}

export default React.memo(function Button({
  label,
  primary,
  active,
  onClick,
  marginTop,
  marginBottom,
}: ButtonProps) {
  const isMutating = useIsMutating();

  return (
    <StyledButton
      type="button"
      primary={primary}
      active={active}
      disabled={!!isMutating}
      onClick={onClick}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      {label}
    </StyledButton>
  );
});

interface StyledButtonProps {
  /** 주요 버튼 여부 */
  primary?: boolean;
  /** 활성화 여부 */
  active?: boolean;
  /** Margin */
  marginTop?: string;
  marginBottom?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  letter-spacing: normal;
  font-weight: 500;
  width: 100%;
  height: 37px;
  margin-top: ${(props) => (!!props.marginTop ? props.marginTop : '0')};
  margin-bottom: ${(props) =>
    !!props.marginBottom ? props.marginBottom : '0'};
  border: ${(props) =>
    props.primary
      ? 0
      : props.active
      ? '1px solid var(--color-navy)'
      : '1px solid var(--color-gray100)'};
  background: ${(props) =>
    props.primary
      ? props.active
        ? 'var(--color-navy)'
        : 'var(--color-gray200)'
      : 'white'};
  color: ${(props) =>
    props.primary
      ? 'var(--color-white)'
      : props?.active
      ? 'var(--color-navy)'
      : 'var(--color-gray300)'};
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
`;
