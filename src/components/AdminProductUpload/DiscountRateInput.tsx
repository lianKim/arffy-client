import { useAtom } from 'jotai';
import React from 'react';
import { DISCOUNT_RATE_REG_EXP } from '../../lib/constants/regExp';
import {
  discountRateAtom,
  discountRateErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function DiscountRateInput() {
  const [discountRate, setDiscountRate] = useAtom(discountRateAtom);
  const [discountRateErrorMessage, setDiscountRateErrorMessage] = useAtom(
    discountRateErrorMessageAtom,
  );

  const handleDiscountRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setDiscountRate(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setDiscountRateErrorMessage('할인율을 입력해주세요');
    } else if (!DISCOUNT_RATE_REG_EXP.test(trimmedValue)) {
      setDiscountRateErrorMessage('0 이상 99 이하의 정수를 입력해주세요');
    } else {
      setDiscountRateErrorMessage('');
    }
  };

  return (
    <FormFieldContainer
      label="DISCOUNT RATE"
      errorMessage={discountRateErrorMessage}
    >
      <Input
        placeholder="할인율을 입력하세요"
        value={discountRate}
        onChange={handleDiscountRate}
        hasError={!!discountRateErrorMessage}
        inputMode="numeric"
      />
    </FormFieldContainer>
  );
});
