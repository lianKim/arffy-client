import React from 'react';
import imageCompression from 'browser-image-compression';

const compressImageFiles = async (
  files: File[],
  maxSizeMB: number = 0.2,
  maxWidthOrHeight: number = 1280,
) => {
  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebworker: true,
  };

  const compressedBlob = await Promise.all(
    files.map((file) => imageCompression(file, options)),
  );

  const compressedFile = compressedBlob.map(
    (blob) => new File([blob], `.jpeg`, { type: 'image/jpeg' }),
  );

  return compressedFile;
};

const convertFilesToBase64 = async (files: File[]) => {
  function getBase64(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (!ev.target) return;

        resolve(String(ev.target.result));
      };

      reader.readAsDataURL(file);
    });
  }

  const promises: Promise<string>[] = [];

  files.forEach((file) => {
    promises.push(getBase64(file));
  });

  return await Promise.all(promises);
};

export { compressImageFiles, convertFilesToBase64 };
