import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { LINE_COLORS, TEXT_COLORS } from '../../../../lib/constants/colors';

interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  hasError?: boolean;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
}

export default React.memo(function Input({
  value,
  onChange,
  placeholder,
  hasError,
  inputMode = 'text',
}: InputProps) {
  const [status, setStatus] = useState<'default' | 'focus' | 'error'>(
    'default',
  );

  const handleInputFocus = () => {
    setStatus('focus');
  };

  const handleInputBlur = () => {
    if (hasError) setStatus('error');
    else setStatus('default');
  };

  return (
    <StyledInput
      status={status}
      value={value}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      onChange={onChange}
      placeholder={placeholder}
      inputMode={inputMode}
    />
  );
});

interface StyledInputProps {
  placeholder?: string;
  status: 'default' | 'focus' | 'error';
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: 1px solid ${(props) => LINE_COLORS[props.status]};
  color: ${(props) => TEXT_COLORS[props.status]};

  &::placeholder {
    color: var(--color-gray300);
  }
`;
