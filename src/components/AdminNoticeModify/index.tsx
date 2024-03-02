import { useAtom } from 'jotai';
import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { currentNoticeIdAtom, topFixedAtom } from '../../store/adminNoticeAtom';
import {
  contentAtom,
  contentErrorMessageAtom,
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
  noticeUploadDatasAtom,
  titleAtom,
  titleErrorMessageAtom,
  existingImageIdsAtom,
  deleteImageIdsAtom,
} from '../../store/adminNoticeUploadAtom';
import ContentTextArea from '../AdminNoticeUpload/ContentTextArea';
import TitleInput from '../AdminNoticeUpload/TitleInput';
import TopFixedCheckBox from '../AdminNoticeUpload/TopFixedCheckBox';
import NoticeImageModifier from './NoticeImageModifier';
import { useSearchParams } from 'react-router-dom';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import { toast } from 'react-toastify';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import {
  useAdminNoticeDetailData,
  useNoticeModifyMutation,
} from '../../lib/apis/adminNoticeAPIs';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default React.memo(function AdminNoticeModify() {
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);

  // noticeId
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const [noticeInfo, setNoticeInfo] = useAtom(noticeUploadDatasAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [topFixed, setTopFixed] = useAtom(topFixedAtom);
  const [imageFiles, setImageFiles] = useAtom(imageFilesAtom);
  const [, setImageUrls] = useAtom(imageUrlsAtom);
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
  // 수정 시 불러올 notice id
  const [noticeId] = useAtom(currentNoticeIdAtom);
  // 수정 시 불러올 기존 데이터
  // const { data: noticeDetail } = useAtomValue(adminNoticeDetailAtom);
  const { data: noticeDetail } = useAdminNoticeDetailData(
    Number(noticeId),
    Number(noticeId),
  );
  const [, setExistingImageIds] = useAtom(existingImageIdsAtom);
  const [deleteImageIds, setDeleteImageIds] = useAtom(deleteImageIdsAtom);
  // useMutate 공지사항 수정
  const { mutate: updateNotice } = useNoticeModifyMutation();

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
    setTopFixed(false);
    setImageFiles([]);
    setImageUrls([]);
    setExistingImageIds([]);
    setDeleteImageIds([]);
    // 에러메세지
    setTitleErrorMessage('');
    setContentErrorMessage('');
    setImagesErrorMessage('');
  }, []);

  const handleSubmitButtonClick = useCallback(async () => {
    if (!noticeId) return;

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

    // useMutate (공지사항 수정 put API 호출)
    updateNotice(
      {
        dataObj: {
          ...noticeInfo,
          noticeId: noticeId,
          deleteImages: deleteImageIds,
        },
        imageFiles,
      },
      {
        onSuccess: () => {
          resetAllValues();
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/admin/notice?id=${id}`);
        },
      },
    );
  }, [noticeInfo, deleteImageIds, imageFiles.length]);

  // // 기존 제목 있으면 value 초기값으로 설정
  useEffect(() => {
    if (!noticeDetail?.data) return;

    setTitle(noticeDetail.data.title);
    setContent(noticeDetail.data.content);
    setTopFixed(noticeDetail.data.topFlag);
    if (noticeDetail.data.imageList && noticeDetail.data.imageList.length) {
      const noticeImageIds = noticeDetail.data.imageList.map(
        (imageInfo) => imageInfo.imageId,
      );
      const noticeImageUrls = noticeDetail.data.imageList.map(
        (imageInfo) => imageInfo.imageUrl,
      );
      setExistingImageIds(noticeImageIds);
      setImageUrls(noticeImageUrls);
      setImageFiles([]);
    }
  }, [noticeDetail]);

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
      {!!noticeDetail?.data && (
        <Container>
          <PageTitle title="Notice" />
          <FormFieldsContainer>
            <TitleInput />
            <ContentTextArea />
            <NoticeImageModifier />
            <TopFixedCheckBox isChecked={topFixed} />
          </FormFieldsContainer>
          <ButtonsPair
            onClickPrimaryButton={handleSubmitButtonClick}
            active={buttonsActive}
          />
        </Container>
      )}
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
