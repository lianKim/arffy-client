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
  onSetImageFileList: React.Dispatch<React.SetStateAction<File[]>>;
  imageUrlList: string[];
  onSetImageUrlList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default React.memo(function ThumbnailUploader({
  onSetImageFileList,
  imageUrlList,
  onSetImageUrlList,
}: ImageUploaderProps) {
  // // 이미지 파일 변환 및 저장하는 함수
  const preTreatImageFiles = useCallback(async (rawImageFiles: File[]) => {
    if (rawImageFiles.length === 0) return;

    // 이미지 파일 압축
    const compressedFileList = await compressImageFiles(
      rawImageFiles,
      0.1,
      800,
    );
    // 이미지 파일을 url로 변환
    const imageUrlList = await convertFilesToBase64(compressedFileList);

    onSetImageUrlList(imageUrlList);
    onSetImageFileList(compressedFileList);
  }, []);

  // 업로드한 이미지 삭제하는 함수 (single image uploader)
  const handleDeleteImageSingle = useCallback(() => {
    onSetImageUrlList([]);
    onSetImageFileList([]);
  }, [onSetImageFileList]);

  return (
    <ImageCarousel>
      {imageUrlList.length > 0 ? (
        <ImageContainer>
          <img src={imageUrlList[0]} alt="thumbnail" />
          {/* 이미지 삭제 버튼 */}
          <DeleteButton onClick={handleDeleteImageSingle}>
            <VscTrash size="22px" />
          </DeleteButton>
        </ImageContainer>
      ) : (
        <CustomFileInput preTreat={preTreatImageFiles} />
      )}
    </ImageCarousel>
  );
});

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc((100vw - 32px) * 1.5);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
