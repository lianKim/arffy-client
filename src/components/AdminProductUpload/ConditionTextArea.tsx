import { useAtom } from 'jotai';
import React from 'react';
import {
  conditionAtom,
  conditionErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import TextArea from '../@common/atoms/TextArea/TextArea';

export default React.memo(function ConditionTextArea() {
  const [condition, setCondition] = useAtom(conditionAtom);
  const [conditionErrorMessage, setConditionErrorMessage] = useAtom(
    conditionErrorMessageAtom,
  );

  const handleCondition = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    setCondition(value);

    // falsy 값일 경우 에러 메세지
    if (trimmedValue && trimmedValue !== '') {
      setConditionErrorMessage('');
    } else {
      setConditionErrorMessage('상품의 컨디션을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="CONDITION" errorMessage={conditionErrorMessage}>
      <TextArea
        placeholder="상품의 컨디션을 입력하세요"
        value={condition}
        onChange={handleCondition}
        hasError={!!conditionErrorMessage}
        height="60px"
      />
    </FormFieldContainer>
  );
});
