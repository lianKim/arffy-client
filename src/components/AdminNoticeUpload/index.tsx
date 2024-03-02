import { useAtom } from 'jotai';
import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  contentAtom,
  contentErrorMessageAtom,
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
  noticeUploadDatasAtom,
  titleAtom,
  titleErrorMessageAtom,
  topFixedAtom,
} from '../../store/adminNoticeUploadAtom';
import ContentTextArea from './ContentTextArea';
import NoticeImageUploader from './NoticeImageUploader';
import TitleInput from './TitleInput';
import TopFixedCheckBox from './TopFixedCheckBox';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import { toast } from 'react-toastify';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { useNoticeUploadMutation } from '../../lib/apis/adminNoticeAPIs';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default React.memo(function AdminNoticeUpload() {
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);
  const [noticeInfo] = useAtom(noticeUploadDatasAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [imageFiles, setImageFiles] = useAtom(imageFilesAtom);
  const [, setImageUrls] = useAtom(imageUrlsAtom);
  const [, setTopFixed] = useAtom(topFixedAtom);
  // 에러 메세지 atom
  const [titleErrorMessage, setTitleErrorMessage] = useAtom(
    titleErrorMessageAtom,
  );
  const [contentErrorMessage, setContentErrorMessage] = useAtom(
    contentErrorMessageAtom,
  );
  const [imagesErrorMessage, setImagesErrorMessage] = useAtom(
    imagesErrorMessageAtom,
  );
  // useMutate 공지사항 등록
  const { mutate: postNotice, isSuccess } = useNoticeUploadMutation();

  // 모든 값 앞뒤 공백 제거해주는 함수
  const TrimAllValues = () => {
    setTitle((prev) => prev?.trim());
    setContent((prev) => prev?.trim());
  };

  // API 호출 전 마지막 유효성 검사
  const validateValues = () => {
    // 미입력 값 유무 체크
    if (!title) {
      throw new PropertyRequiredError('제목');
    }

    if (!content && imageFiles.length < 1) {
      throw new ValidationError('내용을 입력하거나 이미지를 첨부해주세요.');
    }

    // 이미지 개수 초과 여부 체크
    if (imageFiles.length > 3) {
      throw new ValidationError('이미지는 최대 3장까지 첨부 가능합니다.');
    }
  };

  const resetAllValues = useCallback(() => {
    setTitle('');
    setContent('');
    setImageFiles([]);
    setImageUrls([]);
    setTopFixed(false);
    // 에러메세지
    setTitleErrorMessage('');
    setContentErrorMessage('');
    setImagesErrorMessage('');
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    // 모든 입력 값 trim 처리 (앞뒤 공백 제거)
    TrimAllValues();

    // 입력 값 유효성 검사
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    // useMutation (공지사항 등록 post API 요청 후 조회 쿼리 무효화)
    postNotice(
      {
        dataObj: noticeInfo,
        imageFiles,
      },
      {
        onSuccess: () => {
          resetAllValues();
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/admin/notice`);
        },
      },
    );
  }, [noticeInfo, imageFiles.length]);

  // 필수 값이 모두 있고 에러 메세지가 하나도 없을 때 등록 button active
  useEffect(() => {
    if (
      !!title &&
      (!!content || imageFiles.length) &&
      !titleErrorMessage &&
      !contentErrorMessage &&
      !imagesErrorMessage
    ) {
      setButtonsActive(true);
    } else if (buttonsActive) {
      setButtonsActive(false);
    }
  }, [title, content, imageFiles.length, titleErrorMessage, contentErrorMessage, imagesErrorMessage]);

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
        <PageTitle title="Notice" />
        <FormFieldsContainer>
          <TitleInput />
          <ContentTextArea />
          <NoticeImageUploader />
          <TopFixedCheckBox />
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
