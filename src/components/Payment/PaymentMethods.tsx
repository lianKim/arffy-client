import React, { useState } from 'react';
import styled from 'styled-components';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import { useAtom } from 'jotai';
import { pgAtom } from '../../store/paymentAtom';
import { PG_LIST } from '../../lib/constants/payment';

type PayMethodObj = {
  value: string;
  label: string;
};

export default React.memo(function PaymentMethods({}) {
  const [currentMethod, onSetCurrentMethod] = useAtom(pgAtom);
  const [currentMethodLabel, setCurrentMethodLabel] = useState<string>('');

  const handleMethodButtonClick = (method: PayMethodObj) => {
    onSetCurrentMethod(method.value);
    setCurrentMethodLabel(method.label);
  };

  return (
    <CollapsibleContainer label="결제수단" preview={currentMethodLabel}>
      {PG_LIST.map((method) => (
        <MethodButton
          type="button"
          selected={method.value === currentMethod}
          onClick={() => handleMethodButtonClick(method)}
          key={method.value}
        >
          {method.label}
        </MethodButton>
      ))}
    </CollapsibleContainer>
  );
});

interface MethodButtonProps {
  selected: boolean;
}

const MethodButton = styled.button<MethodButtonProps>`
  height: 37px;
  border: 1px solid var(--color-navy);
  padding: 0 18px;
  margin-right: 10px;

  background-color: ${(props) =>
    props.selected ? 'var(--color-navy)' : 'white'};
  color: ${(props) =>
    props.selected ? 'var(--color-white)' : 'var(--color-navy)'};
`;
