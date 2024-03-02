import { useAtom } from 'jotai';
import React from 'react';
import {
  countryAtom,
  countryErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function CountryInput() {
  const [country, setCountry] = useAtom(countryAtom);
  const [countryErrorMessage, setCountryErrorMessage] = useAtom(
    countryErrorMessageAtom,
  );

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    setCountry(value);

    // falsy 값일 경우 에러 메세지
    if (trimmedValue && trimmedValue !== '') {
      setCountryErrorMessage('');
    } else {
      setCountryErrorMessage('생산국을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="COUNTRY" errorMessage={countryErrorMessage}>
      <Input
        placeholder="생산국을 입력하세요"
        value={country}
        onChange={handleCountry}
        hasError={!!countryErrorMessage}
      />
    </FormFieldContainer>
  );
});
