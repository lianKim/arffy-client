import React, { useRef } from 'react';
import styled from 'styled-components';
import { IoIosCheckboxOutline } from '@react-icons/all-files/io/IoIosCheckboxOutline';
import { IoIosCheckbox } from '@react-icons/all-files/io/IoIosCheckbox';
import { useAtom } from 'jotai';
import { termsCheckedAtom } from '../../store/paymentAtom';

export default function TermsAndConditions() {
  const [checked, setChecked] = useAtom(termsCheckedAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = () => {
    if (!inputRef.current) return;

    setChecked(!inputRef.current.checked);
    inputRef.current.checked = !inputRef.current.checked;
  };

  return (
    <Container onClick={handleCheckboxChange}>
      <CheckboxInput type="checkbox" ref={inputRef} name="terms" />
      <CheckboxContainerButton type="button">
        {checked ? <CheckboxChecked /> : <Checkbox />}
      </CheckboxContainerButton>
      <CheckboxLabel htmlFor="terms">
        쇼핑몰 이용약관, 개인정보 수집 및 이용 동의(상품구매)에 모두 동의합니다.
      </CheckboxLabel>
    </Container>
  );
}

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

const Checkbox = styled(IoIosCheckboxOutline)`
  margin-right: 2px;
  font-size: var(--font-large);
  color: var(--color-gray300);
`;

const CheckboxChecked = styled(IoIosCheckbox)`
  margin-right: 2px;
  font-size: var(--font-large);
  color: var(--color-navy);
`;
