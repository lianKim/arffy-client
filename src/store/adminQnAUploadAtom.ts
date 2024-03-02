import { atom } from 'jotai';

export const answerQnAIdAtom = atom<number | null>(null);
export const qnaContentAtom = atom<string>('');
export const qnaImageFileListAtom = atom<File[]>([]);
export const qnaImageUrlListAtom = atom<string[]>([]);
export const qnaImageTypeAtom = atom<'QNA_COMMENT'>('QNA_COMMENT');
// 유효성 검사 Error Message
export const contentErrorMessageAtom = atom<string>('');
export const imageErrorMessageAtom = atom<string>('');

// Q&A 답변 업로드 API 요청 시 전송할 데이터 obj (이미지 파일 제외)
export const qnaUploadDataAtom = atom((get) => {
  const qnaId = get(answerQnAIdAtom);
  const comment = get(qnaContentAtom);
  const imageType = get(qnaImageTypeAtom);

  return {
    qnaId,
    comment,
    imageType,
  };
});
