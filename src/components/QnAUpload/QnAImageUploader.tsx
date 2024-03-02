import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import {
  imageErrorMessageAtom,
  qnaImageFileListAtom,
  qnaImageUrlListAtom,
} from '../../store/qnaUploadAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import ImageUploader from '../@common/organisms/ImageUploader/ImageUploader';

export default React.memo(function QnAImageUploader() {
  const [imageFileList, setImageFileList] = useAtom(qnaImageFileListAtom);
  const [imageUrlList, setImageUrlList] = useAtom(qnaImageUrlListAtom);
  const [imageErrorMessage, setImageErrorMessage] = useAtom(
    imageErrorMessageAtom,
  );

  useEffect(() => {
    if (imageFileList.length > 3) {
      setImageErrorMessage('이미지는 최대 3장까지 첨부 가능합니다');
    } else {
      setImageErrorMessage('');
    }
  }, [imageFileList]);

  return (
    <FormFieldContainer label="IMAGES" errorMessage={imageErrorMessage}>
      <ImageUploader
        onSetImageFileList={setImageFileList}
        imageUrlList={imageUrlList}
        onSetImageUrlList={setImageUrlList}
      />
    </FormFieldContainer>
  );
});
