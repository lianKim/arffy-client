import { atom } from 'jotai';

export const qnaTitleAtom = atom<string>('');
export const qnaContentAtom = atom<string>('');
export const qnaProductIdAtom = atom<number | null>(null);
export const qnaImageFileListAtom = atom<File[]>([]);
export const qnaImageUrlListAtom = atom<string[]>([]);
export const qnaImageTypeAtom = atom<'QNA'>('QNA');
// 유효성 검사 Error Message
export const titleErrorMessageAtom = atom<string>('');
export const contentErrorMessageAtom = atom<string>('');
export const qnaTypeErrorMessageAtom = atom<string>('');
export const imageErrorMessageAtom = atom<string>('');

// Q&A 질문 업로드 API 요청 시 전송할 데이터 obj (이미지 파일 제외)
export const qnaQuestionUploadDataAtom = atom((get) => {
  const title = get(qnaTitleAtom);
  const content = get(qnaContentAtom);
  const productId = get(qnaProductIdAtom);
  const imageType = get(qnaImageTypeAtom);

  return {
    title,
    content,
    productId,
    imageType,
  };
});
