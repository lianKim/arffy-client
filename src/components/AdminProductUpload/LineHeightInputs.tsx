import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SIZE_REG_EXP } from '../../lib/constants/regExp';
import {
  maxLineHeightAtom,
  maxLineHeightErrorMessageAtom,
  minLineHeightAtom,
  minLineHeightErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function LineHeightInputs() {
  const [minLineHeight, setMinLineHeight] = useAtom(minLineHeightAtom);
  const [maxLineHeight, setMaxLineHeight] = useAtom(maxLineHeightAtom);
  const [minLineHeightErrorMessage, setMinLineHeightErrorMessage] = useAtom(
    minLineHeightErrorMessageAtom,
  );
  const [maxLineHeightErrorMessage, setMaxLineHeightErrorMessage] = useAtom(
    maxLineHeightErrorMessageAtom,
  );

  const handleMinLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setMinLineHeight(value);

    // 유효성 검사
    if (!SIZE_REG_EXP.test(trimmedValue)) {
      setMinLineHeightErrorMessage('0 이상 999.9 이하의 숫자를 입력해주세요');
    } else {
      setMinLineHeightErrorMessage('');
    }
  };

  const handleMaxLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setMaxLineHeight(value);

    // 유효성 검사
    if (!SIZE_REG_EXP.test(trimmedValue)) {
      setMaxLineHeightErrorMessage('0 이상 999.9 이하의 숫자를 입력해주세요');
    } else {
      setMaxLineHeightErrorMessage('');
    }
  };

  useEffect(() => {
    if (
      (minLineHeight !== '' && maxLineHeight !== '') ||
      (minLineHeight === '' && maxLineHeight === '')
    ) {
      setMinLineHeightErrorMessage('');
      setMaxLineHeightErrorMessage('');
    }
  }, [minLineHeight, maxLineHeight]);

  return (
    <FormFieldContainer
      label="LINE HEIGHT"
      errorMessage={
        minLineHeightErrorMessage || maxLineHeightErrorMessage || ''
      }
    >
      <MultipleInputs>
        <Input
          placeholder="Min"
          value={minLineHeight}
          onChange={handleMinLineHeight}
          inputMode="decimal"
          hasError={!!minLineHeightErrorMessage || !!maxLineHeightErrorMessage}
        />
        <span>~</span>
        <Input
          placeholder="Max"
          value={maxLineHeight}
          onChange={handleMaxLineHeight}
          inputMode="decimal"
          hasError={!!minLineHeightErrorMessage || !!maxLineHeightErrorMessage}
        />
        <span>cm</span>
      </MultipleInputs>
    </FormFieldContainer>
  );
});

const MultipleInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
