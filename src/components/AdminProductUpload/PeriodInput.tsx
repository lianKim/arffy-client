import { useAtom } from 'jotai';
import React from 'react';
import {
  periodAtom,
  periodErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function PeriodInput() {
  const [period, setPeriod] = useAtom(periodAtom);
  const [periodErrorMessage, setPeriodErrorMessage] = useAtom(
    periodErrorMessageAtom,
  );

  const handlePeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setPeriod(value);

    // falsy 값일 경우 에러 메세지
    if (trimmedValue && trimmedValue !== '') {
      setPeriodErrorMessage('');
    } else {
      setPeriodErrorMessage('생산 시기를 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="PERIOD" errorMessage={periodErrorMessage}>
      <Input
        placeholder="생산 시기를 입력하세요"
        value={period}
        onChange={handlePeriod}
        hasError={!!periodErrorMessage}
      />
    </FormFieldContainer>
  );
});
