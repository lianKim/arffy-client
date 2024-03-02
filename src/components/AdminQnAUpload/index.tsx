import React, { useEffect, useCallback, useState } from 'react';
import AdminQnADetail from '../AdminQnADetail';
import ContentTextArea from './ContentTextArea';
import QnAImageUploader from './QnAImageUploader';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  qnaContentAtom,
  answerQnAIdAtom,
  qnaImageFileListAtom,
  contentErrorMessageAtom,
  imageErrorMessageAtom,
  qnaUploadDataAtom,
} from '../../store/adminQnAUploadAtom';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import { toast } from 'react-toastify';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { useQnAAnswerUploadMutation } from '../../lib/apis/adminQnaAPIs';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default React.memo(function AdminQnAUpload() {
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);
  const [qnaId] = useAtom(answerQnAIdAtom);
  const [content, setContent] = useAtom(qnaContentAtom);
  const [imageFileList, setImageFileList] = useAtom(qnaImageFileListAtom);
  const [, setImageUrlList] = useAtom(qnaImageFileListAtom);
  const [qnaUploadData] = useAtom(qnaUploadDataAtom);

  // 에러 메세지 atom
  const [contentErrorMessage, setContentErrorMessage] = useAtom(
    contentErrorMessageAtom,
  );
  const [imageErrorMessage, setImageErrorMessage] = useAtom(
    imageErrorMessageAtom,
  );
  // useMutation Q&A 답변 등록
  const { mutate: uploadQnAAnswer } = useQnAAnswerUploadMutation();

  // value 앞뒤 공백 제거해주는 함수
  const TrimAllValues = () => {
    setContent((prev) => prev?.trim());
  };

  // API 호출 전 마지막 유효성 검사
  const validateValues = () => {
    // 미입력 값 유무 체크
    if (!content) {
      throw new PropertyRequiredError('내용');
    }

    // 이미지 개수 초과 여부 체크
    if (imageFileList.length > 3) {
      throw new ValidationError('이미지는 최대 3장까지 첨부 가능합니다.');
    }
  };

  const resetAllValues = useCallback(() => {
    setContent('');
    setImageFileList([]);
    setImageUrlList([]);
    // 에러메세지
    setContentErrorMessage('');
    setImageErrorMessage('');
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    // 모든 입력 값 trim 처리 (앞뒤 공백 제거)
    TrimAllValues();

    // 입력 값 유효성 검사 (boolean 반환)
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    // useMutation (공지사항 등록 post API 요청 후 조회 쿼리 무효화)
    uploadQnAAnswer(
      {
        qnaCommentDto: qnaUploadData,
        qnaCommentImages: imageFileList,
      },
      {
        onSuccess: () => {
          resetAllValues();
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/admin/qna/${qnaId}`);
        },
      },
    );
  }, [qnaUploadData, imageFileList.length]);

  // 필수 값이 모두 있고 에러 메세지가 하나도 없을 때 등록 button active
  useEffect(() => {
    if (
      !!content &&
      imageFileList.length < 4 &&
      !contentErrorMessage &&
      !imageErrorMessage
    ) {
      setButtonsActive(true);
    } else if (buttonsActive) {
      setButtonsActive(false);
    }
  }, [content, imageFileList.length, contentErrorMessage, imageErrorMessage]);

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
        <AdminQnADetail isCommentPage />
        <Division />
        <FormFieldsContainer>
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

const Division = styled.div`
  display: block;
  width: 100%;
  margin-top: 60px;
`;
