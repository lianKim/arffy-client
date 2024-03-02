import { useState } from 'react';

export const validateTitle = (title: string) => {
  if (!title) {
    return '제목을 입력해주세요';
  }
  return '';
};

export const validateContent = (content: string, images: File[] | string[]) => {
  if (!content && images.length < 1) {
    return '내용을 입력하거나 이미지를 첨부해주세요';
  }

  return '';
};

export const validateImages = (images: File[] | string[]) => {
  // 이미지 개수 초과 여부 체크
  if (images.length > 3) {
    return '이미지는 최대 3장까지 첨부 가능합니다';
  }

  return '';
};
