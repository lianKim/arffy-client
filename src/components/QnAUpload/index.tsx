import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  contentErrorMessageAtom,
  imageErrorMessageAtom,
  qnaContentAtom,
  qnaImageFileListAtom,
  qnaImageUrlListAtom,
  qnaProductIdAtom,
  qnaQuestionUploadDataAtom,
  qnaTitleAtom,
  titleErrorMessageAtom,
} from '../../store/qnaUploadAtom';
import QnAImageUploader from './QnAImageUploader';
import QnATypeSelector from './QnATypeSelector';
import { useAtom } from 'jotai';
import ContentTextArea from './ContentTextArea';
import { QNA_TYPE_OBJ } from '../../lib/constants/qnaTypes';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import { toast } from 'react-toastify';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { useQnAQuestionUploadMutation } from '../../lib/apis/qnaAPIs';
import { ObjectIndexable } from '../../@types/common';

export default React.memo(function QnAUpload() {
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);
  const [questionData, setQuestionData] = useAtom(qnaQuestionUploadDataAtom);
  const [title, setTitle] = useAtom(qnaTitleAtom);
  const [content, setContent] = useAtom(qnaContentAtom);
  const [qnaProductId, setQnAProductId] = useAtom(qnaProductIdAtom);
  const [imageFileList, setimageFileList] = useAtom(qnaImageFileListAtom);
  const [imageUrlList, setImageUrlList] = useAtom(qnaImageUrlListAtom);
  // 에러 메세지 atom
  const [titleErrorMessage, setTitleErrorMessage] = useAtom(
    titleErrorMessageAtom,
  );
  const [contentErrorMessage, setContentErrorMessage] = useAtom(
    contentErrorMessageAtom,
  );
  const [imageErrorMessage, setImageErrorMessage] = useAtom(
    imageErrorMessageAtom,
  );
  // useMutation Q&A 질문 등록
  const { mutate: uploadQnAQuestion } = useQnAQuestionUploadMutation();

  // 모든 값 앞뒤 공백 제거해주는 함수
  const TrimAllValues = () => {
    setTitle((prev) => prev?.trim());
    setContent((prev) => prev?.trim());
  };

  // API 호출 전 마지막 유효성 검사
  const validateValues = () => {
    // 미입력 값 유무 체크
    if (!title) {
      throw new ValidationError('Q&A 타입을 선택해주세요.');
    }

    if (!content) {
      throw new PropertyRequiredError('내용');
    }

    // 이미지 개수 초과 여부 체크
    if (imageFileList.length > 3) {
      throw new ValidationError('이미지는 최대 3장까지 첨부 가능합니다.');
    }
  };

  // 입력값 초기화 함수
  const resetAllValues = useCallback(() => {
    setTitle('');
    setContent('');
    setimageFileList([]);
    setImageUrlList([]);
    setQnAProductId(null);
    // 에러메세지
    setTitleErrorMessage('');
    setContentErrorMessage('');
    setImageErrorMessage('');
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    // 모든 입력 값 trim 처리 (앞뒤 공백 제거)
    TrimAllValues();

    // 유효성 검사
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    // useMutation (공지사항 등록 post API 요청 후 조회 쿼리 무효화)
    uploadQnAQuestion(
      {
        qnaRequest: {
          ...questionData,
          qnaType: (QNA_TYPE_OBJ as ObjectIndexable)[title],
        },
        multipartFileList: imageFileList,
      },
      {
        onSuccess: () => {
          resetAllValues();
          return window.history.back();
        },
      },
    );
  }, [questionData, title, imageFileList.length]);

  // 필수 값이 모두 있고 에러 메세지가 하나도 없을 때 등록 button active
  useEffect(() => {
    if (
      !!title &&
      !!content &&
      !titleErrorMessage &&
      !contentErrorMessage &&
      !imageErrorMessage
    ) {
      setButtonsActive(true);
    } else if (buttonsActive) {
      setButtonsActive(false);
    }
  }, [title, content, titleErrorMessage, contentErrorMessage, imageErrorMessage]);

  // 언마운트 시 데이터 초기화
  useEffect(() => {
    return () => {
      setTimeout(resetAllValues, 1000);
    };
  }, []);

  return (
    <>
      <MutatingSpinner />
      <Container>
        <PageTitle title="Q&A" />
        <FormFieldsContainer>
          <QnATypeSelector />
          <ContentTextArea />
          <QnAImageUploader />
        </FormFieldsContainer>
        <ButtonsPair
          onClickPrimaryButton={handleSubmitButtonClick}
          active={buttonsActive}
        />
      </Container>
    </>
  );
});

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    width: 30vw;
    margin: 0 auto;
  }
`;

const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin-bottom: 42px;
`;
