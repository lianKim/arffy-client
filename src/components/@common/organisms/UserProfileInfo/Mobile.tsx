import React from 'react';
import FormFieldContainer from '../../molecules/FormFieldContainer/FormFieldContainer';
import { PHONE_NUMBER_REG_EXP } from '../../../../lib/constants/regExp';
import Input from '../../atoms/Input/Input';

interface MobileProps {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}

export default React.memo(function Mobile({
  value,
  setValue,
  errorMessage,
  setErrorMessage,
}: MobileProps) {
  // 휴대폰 번호 입력 onChange 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue || !setErrorMessage) return;

    const value = e.target.value;
    const trimmedValue = value?.trim();
    setValue(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setErrorMessage('휴대폰 번호를 입력해주세요');
    } else if (!PHONE_NUMBER_REG_EXP.test(trimmedValue)) {
      setErrorMessage('휴대폰 번호는 10~11자의 숫자를 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <FormFieldContainer label="MOBILE" errorMessage={errorMessage}>
      <Input
        placeholder="휴대폰번호를 입력해주세요"
        value={value}
        onChange={handleInputChange}
        inputMode="tel"
        hasError={!!errorMessage}
      />
    </FormFieldContainer>
  );
});
