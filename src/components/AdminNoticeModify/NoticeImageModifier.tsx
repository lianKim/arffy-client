import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  deleteImageIdsAtom,
  existingImageIdsAtom,
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
} from '../../store/adminNoticeUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';

export default React.memo(function NoticeImageModifier() {
  const [, setImageFileList] = useAtom(imageFilesAtom);
  const [imageUrlList, setImageUrlList] = useAtom(imageUrlsAtom);
  const [imagesErrorMessage, setImagesErrorMessage] = useAtom(
    imagesErrorMessageAtom,
  );
  const [existingImageIdList, setExistingImageIdList] =
    useAtom(existingImageIdsAtom);

  const [, setDeleteImageIdList] = useAtom(deleteImageIdsAtom);

  useEffect(() => {
    if (imageUrlList.length > 3) {
      setImagesErrorMessage('이미지는 최대 3장까지 첨부 가능합니다');
    } else {
      setImagesErrorMessage('');
    }
  }, [imageUrlList.length]);

  return (
    <FormFieldContainer label="IMAGES" errorMessage={imagesErrorMessage}>
      <ImageUploader
        onSetImageFileList={setImageFileList}
        imageUrlList={imageUrlList}
        onSetImageUrlList={setImageUrlList}
        existingImageIdList={existingImageIdList}
        onSetExistingImageIdList={setExistingImageIdList}
        onSetDeleteImageIdList={setDeleteImageIdList}
      />
    </FormFieldContainer>
  );
});
