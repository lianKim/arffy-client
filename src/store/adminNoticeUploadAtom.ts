import { atom } from 'jotai';

export const titleAtom = atom<string>('');
export const contentAtom = atom<string>('');
export const imageFilesAtom = atom<File[]>([]);
export const imageUrlsAtom = atom<string[]>([]);
export const topFixedAtom = atom<boolean>(false);
export const noticeImageTypeAtom = atom<'NOTICE'>('NOTICE');

// 공지사항 등록 API 요청 시 blob에 넣을 데이터 obj (이미지 제외한 모든 정보)
export const noticeUploadDatasAtom = atom((get) => {
  const title = String(get(titleAtom));
  const content = String(get(contentAtom));
  const topFlag = get(topFixedAtom);
  const imageType = get(noticeImageTypeAtom);

  return {
    title,
    content,
    topFlag,
    imageType,
  };
});

// 유효성 검사 에러 메세지
export const titleErrorMessageAtom = atom<string>('');
export const contentErrorMessageAtom = atom<string>('');
export const topFixedErrorMessageAtom = atom<string>('');
export const imagesErrorMessageAtom = atom<string>('');

// 수정 시 기존 이미지들 id 배열
export const existingImageIdsAtom = atom<number[]>([]);
export const deleteImageIdsAtom = atom(<number[]>[]);
