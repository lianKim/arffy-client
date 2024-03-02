import { useAtom } from 'jotai';
import React from 'react';
import {
  materialAtom,
  materialErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function MaterialInputs() {
  const [material, setMaterial] = useAtom(materialAtom);
  const [materialErrorMessage, setMaterialErrorMessage] = useAtom(
    materialErrorMessageAtom,
  );

  const handleMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setMaterial(value);

    // falsy 값일 경우 에러 메세지
    if (trimmedValue && trimmedValue !== '') {
      setMaterialErrorMessage('');
    } else {
      setMaterialErrorMessage('상품 소재를 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="MATERIAL" errorMessage={materialErrorMessage}>
      <Input
        placeholder="상품 소재를 입력하세요"
        value={material}
        onChange={handleMaterial}
        hasError={!!materialErrorMessage}
      />
    </FormFieldContainer>
  );
});
