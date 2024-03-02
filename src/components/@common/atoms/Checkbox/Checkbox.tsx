import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosCheckboxOutline } from '@react-icons/all-files/io/IoIosCheckboxOutline';
import { IoIosCheckbox } from '@react-icons/all-files/io/IoIosCheckbox';
import { useAtom } from 'jotai';
import { termsCheckedAtom } from '../../../../store/paymentAtom';

interface CheckboxProps {
  children: React.ReactNode;
  checked: boolean;
  onSetChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default React.memo(function Checkbox({
  children,
  checked,
  onSetChecked,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    if (!inputRef.current) return;

    inputRef.current.checked = !checked;
    onSetChecked(!checked);
  };

  return (
    <Container onClick={handleCheckboxChange}>
      <CheckboxInput type="checkbox" ref={inputRef} name="checkbox" />
      <CheckboxContainerButton type="button">
        {checked ? <CheckboxChecked /> : <CheckboxDefault />}
      </CheckboxContainerButton>
      <CheckboxLabel htmlFor="checkbox">{children}</CheckboxLabel>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  line-height: calc(var(--font-micro) * 1.5);
`;

const CheckboxContainerButton = styled.button`
  display: flex;
  align-items: center;
`;

const CheckboxDefault = styled(IoIosCheckboxOutline)`
  margin-right: 2px;
  font-size: var(--font-large);
  color: var(--color-gray300);
`;

const CheckboxChecked = styled(IoIosCheckbox)`
  margin-right: 2px;
  font-size: var(--font-large);
  color: var(--color-navy);
`;
