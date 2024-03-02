import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  deleteImageIdsAtom,
  existingImageIdsAtom,
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
} from '../../store/adminProductUploadAtom';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';

export default React.memo(function ProductImagesModifier() {
  const [imageFileList, setImageFileList] = useAtom(imageFilesAtom);
  const [imageUrlList, setImageUrlList] = useAtom(imageUrlsAtom);
  const [existingImageIdList, setExistingImageIdList] =
    useAtom(existingImageIdsAtom);
  const [, setDeleteImageIdList] = useAtom(deleteImageIdsAtom);
  const [imagesErrorMessage, setImagesErrorMessage] = useAtom(
    imagesErrorMessageAtom,
  );

  useEffect(() => {
    if (imageUrlList.length < 1) {
      setImagesErrorMessage('이미지를 첨부해주세요');
    } else if (imageUrlList.length > 20) {
      setImagesErrorMessage('이미지는 최대 20장까지 첨부 가능합니다');
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
