import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  thumbnailErrorMessageAtom,
  thumbnailFileAtom,
  thumbnailUrlAtom,
} from '../../store/adminProductUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';

export default React.memo(function ThumbnailUploader() {
  const [thumbnailFile, setThumbnailFile] = useAtom(thumbnailFileAtom);
  const [thumbnailUrl, setThumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useAtom(
    thumbnailErrorMessageAtom,
  );

  useEffect(() => {
    if (thumbnailFile.length === 1) {
      setThumbnailErrorMessage('');
    }
  }, [thumbnailFile]);

  return (
    <FormFieldContainer label="THUMBNAIL" errorMessage={thumbnailErrorMessage}>
      <ImageUploader
        onSetImageFileList={setThumbnailFile}
        imageUrlList={thumbnailUrl}
        onSetImageUrlList={setThumbnailUrl}
        single
      />
    </FormFieldContainer>
  );
});
