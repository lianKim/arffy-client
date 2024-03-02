import React from 'react';
import styled from 'styled-components';

interface DividerShortProps {
  noMarginBottom?: boolean;
}

export default React.memo(function DividerShort({
  noMarginBottom,
}: DividerShortProps) {
  return <Divider noMarginBottom={noMarginBottom} />;
});

interface DividerProps {
  noMarginBottom?: boolean;
}

const Divider = styled.div<DividerProps>`
  width: 14px;
  height: 1px;
  background-color: var(--color-navy);
  margin-bottom: ${(props) => (props.noMarginBottom ? '0' : '14px')};
`;
