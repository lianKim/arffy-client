import React from 'react';
import { useAtom } from 'jotai';
import {
  contentErrorMessageAtom,
  qnaContentAtom,
} from '../../store/qnaUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import TextArea from '../@common/atoms/TextArea/TextArea';

export default React.memo(function ContentTextArea() {
  const [content, setContent] = useAtom(qnaContentAtom);
  const [contentErrorMessage, setContentErrorMessage] = useAtom(
    contentErrorMessageAtom,
  );

  const handledContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    setContent(value);

    // falsy 값일 경우 에러 메세지
    if (!!trimmedValue) {
      setContentErrorMessage('');
    } else {
      setContentErrorMessage('내용을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="CONTENT" errorMessage={contentErrorMessage}>
      <TextArea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={handledContent}
        height="320px"
        hasError={!!contentErrorMessage}
      />
    </FormFieldContainer>
  );
});
