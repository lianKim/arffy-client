import React from 'react';
import styled from 'styled-components';

interface SoldOutMarkProps {
  noMargin?: boolean;
}

export default React.memo(function SoldOutMark({ noMargin }: SoldOutMarkProps) {
  return <SoldOut noMargin={noMargin}>품절</SoldOut>;
});

interface SoldOutProps {
  noMargin?: boolean;
}

const SoldOut = styled.div<SoldOutProps>`
  && {
    display: inline-block;
    font-size: var(--font-x-micro);
    line-height: var(--font-x-micro);
    color: var(--color-white);
    background-color: var(--color-orange);
    padding: 2px 4px 2px 3px;
    margin-top: ${(props) => (props.noMargin ? '0' : '8px')};
  }
`;
