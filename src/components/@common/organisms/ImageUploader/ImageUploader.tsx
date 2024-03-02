import React, { useCallback } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import styled from 'styled-components';
import { VscTrash } from '@react-icons/all-files/vsc/VscTrash';
import {
  compressImageFiles,
  convertFilesToBase64,
} from '../../../../utils/handleImageFiles';
import CustomFileInput from '../../molecules/CustomFileInput/CustomFileInput';

interface ImageUploaderProps {
  /** 단일 이미지 여부 Boolean */
  single?: boolean;
  onSetImageFileList: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrlList: string[];
  onSetImageUrlList: React.Dispatch<React.SetStateAction<string[]>>;
  /** 수정모드: 기존 이미지 id 배열 */
  existingImageIdList?: number[];
  /** 수정모드: 기존 이미지 id 배열 set 함수 */
  onSetExistingImageIdList?: React.Dispatch<React.SetStateAction<number[]>>;
  /** 수정모드: 삭제할 id 배열 set 함수 */
  onSetDeleteImageIdList?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default React.memo(function ImageUploader({
  onSetImageFileList,
  imageUrlList,
  onSetImageUrlList,
  existingImageIdList,
  onSetExistingImageIdList,
  onSetDeleteImageIdList,
  single,
}: ImageUploaderProps) {
  // // 이미지 파일 변환 및 저장하는 함수
  const preTreatImageFiles = useCallback(async (rawImageFiles: File[]) => {
    if (rawImageFiles.length === 0) return;

    // 이미지 파일 압축
    const compressedFileList = await compressImageFiles(rawImageFiles);
    // 이미지 파일을 url로 변환
    const imageUrlList = await convertFilesToBase64(compressedFileList);

    onSetImageUrlList((prev) => [...prev, ...imageUrlList]);
    onSetImageFileList((prev) => [...prev, ...compressedFileList]);
  }, []);

  // 업로드한 이미지 삭제하는 함수 (multiple image uploader)
  const handleDeleteImage = useCallback((idx: number) => {
    onSetImageUrlList((prev) => [
      ...prev.slice(0, idx),
      ...prev.slice(idx + 1),
    ]);

    onSetImageFileList((prev) => [
      ...prev.slice(0, idx),
      ...prev.slice(idx + 1),
    ]);
  }, []);

  // 수정모드: 업로드한 이미지 삭제하는 함수 (multiple image uploader)
  const handleDeleteImageForModifying = useCallback(
    (idx: number) => {
      if (
        !onSetDeleteImageIdList ||
        !onSetExistingImageIdList ||
        !existingImageIdList
      )
        return;

      onSetDeleteImageIdList((prev) => {
        return !!existingImageIdList[idx]
          ? [...prev, existingImageIdList[idx]]
          : [...prev];
      });
      onSetImageUrlList((prev) => {
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
      onSetImageFileList((prev) => {
        const gapOfIdxs = idx - (imageUrlList.length - prev.length);
        return [...prev.slice(0, gapOfIdxs), ...prev.slice(gapOfIdxs + 1)];
      });
      onSetExistingImageIdList((prev) => {
        const filteredPrev = prev.filter((id) => id !== undefined);
        return [...filteredPrev.slice(0, idx), ...filteredPrev.slice(idx + 1)];
      });
    },
    [existingImageIdList?.length, imageUrlList?.length],
  );

  // 업로드한 이미지 삭제하는 함수 (single image uploader)
  const handleDeleteImageSingle = useCallback(() => {
    onSetImageUrlList(() => []);
    onSetImageFileList(() => []);
  }, []);

  return (
    <>
      {/* multiple image uploader */}
      {!single && (
        <ImageCarousel>
          {imageUrlList.map((src, idx) => {
            return (
              <ImageContainer key={src}>
                <img src={src} alt="product image" />
                {/* 이미지 삭제 버튼 */}
                <DeleteButton
                  onClick={() =>
                    onSetDeleteImageIdList
                      ? // 수정 모드
                        handleDeleteImageForModifying(idx)
                      : // 등록 모드
                        handleDeleteImage(idx)
                  }
                >
                  <VscTrash size="22px" />
                </DeleteButton>
              </ImageContainer>
            );
          })}
          <CustomFileInput preTreat={preTreatImageFiles} single={single} />
        </ImageCarousel>
      )}
      {/* single image uploader (ex. thumbnail)  */}
      {single && (
        <SingleUploaderContainer>
          {imageUrlList.length > 0 ? (
            <ImageContainer>
              <img src={imageUrlList[0]} alt="thumbnail" />
              {/* 이미지 삭제 버튼 */}
              <DeleteButton onClick={handleDeleteImageSingle}>
                <VscTrash size="22px" />
              </DeleteButton>
            </ImageContainer>
          ) : (
            <CustomFileInput preTreat={preTreatImageFiles} single={single} />
          )}
        </SingleUploaderContainer>
      )}
    </>
  );
});

const SingleUploaderContainer = styled.div`
  width: 90vw;
  height: calc(90vw * 1.5);

  @media screen and (min-width: 1024px) {
    width: 30vw;
    height: calc(30vw * 1.5);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 90vw;
  height: calc(90vw * 1.5);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 1024px) {
    width: 30vw;
    height: calc(30vw * 1.5);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-orange);
  padding: 8px;
  color: var(--color-white);
  display: flex;
  align-items: center;
`;
