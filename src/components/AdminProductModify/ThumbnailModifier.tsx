import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  thumbnailErrorMessageAtom,
  thumbnailFileAtom,
  thumbnailUrlAtom,
} from '../../store/adminProductUploadAtom';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';

export default React.memo(function ThumbnailModifier() {
  const [thumbnailFile, setThumbnailFile] = useAtom(thumbnailFileAtom);
  const [thumbnailUrl, setThumbnailUrl] = useAtom(thumbnailUrlAtom);
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useAtom(
    thumbnailErrorMessageAtom,
  );

  useEffect(() => {
    if (thumbnailUrl.length === 1) {
      setThumbnailErrorMessage('');
    }
  }, [thumbnailUrl]);

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
