import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { QUESTION_OPTIONS } from '../../lib/constants/qnaTypes';
import { qnaTitleAtom, titleErrorMessageAtom } from '../../store/qnaUploadAtom';
import Select from '../@common/atoms/Select/Select';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';

export default React.memo(function QnATypeSelector() {
  const [title, setTitle] = useAtom(qnaTitleAtom);
  const [titleErrorMessage, setTitleErrorMessage] = useAtom(
    titleErrorMessageAtom,
  );

  useEffect(() => {
    if (title && title !== '') {
      setTitleErrorMessage('');
    }
  }, [title]);

  return (
    <FormFieldContainer label="Q&A TYPE" errorMessage={titleErrorMessage}>
      <Select
        label="문의 종류를 선택해주세요"
        options={QUESTION_OPTIONS}
        value={title}
        onSetValue={setTitle}
        status="default"
      />
    </FormFieldContainer>
  );
});
