import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { SIZE_REG_EXP } from '../../lib/constants/regExp';
import {
  depthAtom,
  depthErrorMessageAtom,
  heightAtom,
  heightErrorMessageAtom,
  widthAtom,
  widthErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function SizeInputs() {
  const [width, setWidth] = useAtom(widthAtom);
  const [depth, setDepth] = useAtom(depthAtom);
  const [height, setHeight] = useAtom(heightAtom);
  const [widthErrorMessage, setWidthErrorMessage] = useAtom(
    widthErrorMessageAtom,
  );
  const [depthErrorMessage, setDepthErrorMessage] = useAtom(
    depthErrorMessageAtom,
  );
  const [heightErrorMessage, setHeightErrorMessage] = useAtom(
    heightErrorMessageAtom,
  );

  const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setWidth(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setWidthErrorMessage('상품의 너비를 입력해주세요');
    } else if (!SIZE_REG_EXP.test(trimmedValue)) {
      setWidthErrorMessage('0 이상 999.9 이하의 숫자를 입력해주세요');
    } else {
      setWidthErrorMessage('');
    }
  };

  const handleDepth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setDepth(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setDepthErrorMessage('상품의 깊이를 입력해주세요');
    } else if (!SIZE_REG_EXP.test(trimmedValue)) {
      setDepthErrorMessage('0 이상 999.9 이하의 숫자를 입력해주세요');
    } else {
      setDepthErrorMessage('');
    }
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setHeight(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setHeightErrorMessage('상품의 높이를 입력해주세요');
    } else if (!SIZE_REG_EXP.test(trimmedValue)) {
      setHeightErrorMessage('0 이상 999.9 이하의 숫자를 입력해주세요');
    } else {
      setHeightErrorMessage('');
    }
  };

  return (
    <FormFieldContainer
      label="SIZE"
      errorMessage={
        widthErrorMessage || depthErrorMessage || heightErrorMessage
      }
    >
      <MultipleInputs>
        <Input
          placeholder="Width"
          value={width}
          onChange={handleWidth}
          inputMode="decimal"
          hasError={!!widthErrorMessage}
        />
        <span>x</span>
        <Input
          placeholder="Depth"
          value={depth}
          onChange={handleDepth}
          inputMode="decimal"
          hasError={!!depthErrorMessage}
        />
        <span>x</span>
        <Input
          placeholder="Height"
          value={height}
          onChange={handleHeight}
          inputMode="decimal"
          hasError={!!heightErrorMessage}
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
