import React from 'react';
import FormFieldContainer from '../../molecules/FormFieldContainer/FormFieldContainer';
import { USER_NAME_REG_EXP } from '../../../../lib/constants/regExp';
import Input from '../../atoms/Input/Input';

interface NameProps {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}

export default React.memo(function Name({
  value,
  setValue,
  errorMessage,
  setErrorMessage,
}: NameProps) {
  // 이름 입력 OnChange 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue || !setErrorMessage) return;

    const value = e.target.value;
    const trimmedValue = value?.trim();
    setValue(value);

    // 유효성 검사
    if (!trimmedValue || trimmedValue === '') {
      setErrorMessage('이름을 입력해주세요');
    } else if (!USER_NAME_REG_EXP.test(trimmedValue)) {
      setErrorMessage('이름은 2~20자의 한글/영어를 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <FormFieldContainer label="NAME" errorMessage={errorMessage}>
      <Input
        placeholder="이름을 입력해주세요"
        value={value}
        onChange={handleInputChange}
        hasError={!!errorMessage}
      />
    </FormFieldContainer>
  );
});
