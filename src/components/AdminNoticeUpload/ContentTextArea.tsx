import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import {
  contentAtom,
  contentErrorMessageAtom,
  imageUrlsAtom,
} from '../../store/adminNoticeUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import TextArea from '../@common/atoms/TextArea/TextArea';

export default React.memo(function ContentTextArea() {
  const [content, setContent] = useAtom(contentAtom);
  const [imageUrls] = useAtom(imageUrlsAtom);
  const [contentErrorMessage, setContentErrorMessage] = useAtom(
    contentErrorMessageAtom,
  );

  const handledContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const trimmedValue = value.trim();
      setContent(value);

      // falsy 값일 경우 에러 메세지
      if (!!trimmedValue || imageUrls.length > 0) {
        setContentErrorMessage('');
      } else {
        setContentErrorMessage('내용을 입력하거나 이미지를 첨부해주세요');
      }
    },
    [imageUrls.length],
  );

  return (
    <FormFieldContainer label="CONTENT" errorMessage={contentErrorMessage}>
      <TextArea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={handledContent}
        status="default"
        height="320px"
      />
    </FormFieldContainer>
  );
});
