import { useAtom } from 'jotai';
import React from 'react';
import {
  titleAtom,
  titleErrorMessageAtom,
} from '../../store/adminNoticeUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function TitleInput() {
  const [title, setTitle] = useAtom(titleAtom);
  const [titleErrorMessage, setTitleErrorMessage] = useAtom(
    titleErrorMessageAtom,
  );

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();

    setTitle(value);

    // 유효성 검사
    if (!!trimmedValue) {
      setTitleErrorMessage('');
    } else {
      setTitleErrorMessage('제목을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer label="TITLE" errorMessage={titleErrorMessage}>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleTitle}
        hasError={!!titleErrorMessage}
      />
    </FormFieldContainer>
  );
});
