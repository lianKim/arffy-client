import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import {
  descriptionAtom,
  descriptionErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import TextArea from '../@common/atoms/TextArea/TextArea';

export default React.memo(function DescriptionTextArea() {
  const [description, setDescription] = useAtom(descriptionAtom);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useAtom(
    descriptionErrorMessageAtom,
  );

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const trimmedValue = value?.trim();
    setDescription(value);

    // falsy 값일 경우 에러 메세지
    if (trimmedValue && trimmedValue !== '') {
      setDescriptionErrorMessage('');
    } else {
      setDescriptionErrorMessage('상세 설명을 입력해주세요');
    }
  };

  return (
    <FormFieldContainer
      label="DESCRIPTION"
      errorMessage={descriptionErrorMessage}
    >
      <TextArea
        placeholder="상품 상세 설명을 입력하세요"
        value={description}
        onChange={handleDescription}
        hasError={!!descriptionErrorMessage}
        height="180px"
      />
    </FormFieldContainer>
  );
});

const DescriptionBox = styled.textarea`
  height: 180px;
`;
