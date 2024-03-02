import { useAtom } from 'jotai';
import React from 'react';
import { PRICE_REG_EXP } from '../../lib/constants/regExp';
import {
  priceAtom,
  priceErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function PriceInput() {
  const [price, setPrice] = useAtom(priceAtom);
  const [priceErrorMessage, setPriceErrorMessage] = useAtom(
    priceErrorMessageAtom,
  );

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setPrice(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setPriceErrorMessage('상품 가격을 입력해주세요');
    } else if (
      !PRICE_REG_EXP.test(trimmedValue) ||
      Number(trimmedValue) < 1000 ||
      10000000 < Number(trimmedValue)
    ) {
      setPriceErrorMessage('1,000 이상 10,000,000 이하의 정수를 입력해주세요');
    } else {
      setPriceErrorMessage('');
    }
  };

  return (
    <FormFieldContainer label="PRICE" errorMessage={priceErrorMessage}>
      <Input
        placeholder="상품 가격을 입력하세요"
        value={price}
        onChange={handlePrice}
        inputMode="numeric"
        hasError={!!priceErrorMessage}
      />
    </FormFieldContainer>
  );
});
