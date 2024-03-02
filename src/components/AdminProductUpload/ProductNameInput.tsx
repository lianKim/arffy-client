import { useAtom } from 'jotai';
import React from 'react';
import {
  productNameAtom,
  productNameErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function ProductNameInput() {
  const [productName, setProductName] = useAtom(productNameAtom);
  const [productNameErrorMessage, setProductNameErrorMessage] = useAtom(
    productNameErrorMessageAtom,
  );

  const handleProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();

    setProductName(value);

    // 유효성 검사
    if (trimmedValue && trimmedValue !== '') {
      setProductNameErrorMessage('');
    } else {
      setProductNameErrorMessage('상품명을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer
      label="PRODUCT NAME"
      errorMessage={productNameErrorMessage}
    >
      <Input
        placeholder="상품명을 입력하세요"
        value={productName}
        onChange={handleProductName}
        hasError={!!productNameErrorMessage}
      />
    </FormFieldContainer>
  );
});
