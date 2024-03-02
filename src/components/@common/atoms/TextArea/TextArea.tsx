import React, { useState } from 'react';
import styled from 'styled-components';
import { LINE_COLORS, TEXT_COLORS } from '../../../../lib/constants/colors';

interface TextAreaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  status?: 'default' | 'focus' | 'error';
  placeholder?: string;
  height?: string;
  hasError?: boolean;
}

export default React.memo(function TextArea({
  // status,
  value,
  onChange,
  placeholder,
  height,
  hasError,
}: TextAreaProps) {
  const [status, setStatus] = useState<'default' | 'focus' | 'error'>(
    'default',
  );

  const handleTextAreaFocus = () => {
    setStatus('focus');
  };

  const handleTextAreaBlur = () => {
    if (hasError) setStatus('error');
    else setStatus('default');
  };

  return (
    <StyledTextArea
      placeholder={placeholder || ''}
      value={value}
      onChange={onChange}
      onFocus={handleTextAreaFocus}
      onBlur={handleTextAreaBlur}
      status={status}
      height={height}
    />
  );
});

interface StyledTextAreaProps {
  status: 'default' | 'focus' | 'error';
  height?: string;
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  border: 1px solid ${(props) => LINE_COLORS[props.status]};
  color: ${(props) => TEXT_COLORS[props.status]};
  height: ${(props) => props.height || '80px'};

  &::placeholder {
    color: var(--color-gray300);
  }
`;
