import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';

export default React.memo(function ProductImagesUploader() {
  const [imageFileList, setImageFileList] = useAtom(imageFilesAtom);
  const [imageUrlList, setImageUrlList] = useAtom(imageUrlsAtom);
  const [imagesErrorMessage, setImagesErrorMessage] = useAtom(
    imagesErrorMessageAtom,
  );

  useEffect(() => {
    if (imageFileList.length > 0 && imageFileList.length < 21) {
      setImagesErrorMessage('');
    }
  }, [imageFileList]);

  return (
    <FormFieldContainer label="IMAGES" errorMessage={imagesErrorMessage}>
      <ImageUploader
        onSetImageFileList={setImageFileList}
        imageUrlList={imageUrlList}
        onSetImageUrlList={setImageUrlList}
      />
    </FormFieldContainer>
  );
});
