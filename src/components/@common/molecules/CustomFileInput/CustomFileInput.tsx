import React, { useRef } from 'react';
import styled from 'styled-components';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';

interface CustomFileInputProps {
  preTreat: (rawImageFiles: File[]) => void;
  single?: boolean;
}

export default React.memo(function CustomFileInput({
  preTreat,
  single,
}: CustomFileInputProps) {
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const fileList = e.target.files;
    let filesArray: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
      filesArray[i] = fileList[i];
    }

    // 이미지 파일을 압축 및 url 변환 후 atom에 저장하는 함수
    preTreat(filesArray);
  };

  const handleButtonClick = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FileInputLabel>
      <Button type="button" onClick={handleButtonClick} />
      <PictureIcon />
      <FileInput
        type="file"
        id="input-file"
        multiple={!single}
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
    </FileInputLabel>
  );
});

const FileInputLabel = styled.label`
  display: block;
  width: 90vw;
  height: calc(90vw * 1.5);
  margin: 0 auto;
  overflow-x: hidden;
  background-color: var(--color-gray100);
  cursor: pointer;
  position: relative;

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

const Button = styled.button`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
`;

const FileInput = styled.input`
  display: none;
`;

const PictureIcon = styled(BiImageAdd)`
  font-size: 32px;
  color: var(--color-gray200);
  opacity: 0.5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
