import { atom } from 'jotai';

export const qnaIdAtom = atom<number | null>(null);
export const qnaProductIdAtom = atom<number | null>(null);

// 페이징 관련 아톰
export const isNoAnsweredOnlyAtom = atom<boolean>(false);
export const pageToMoveAtom = atom<number>(0);
export const pageSetOffsetAtom = atom<number>(0);
export const pageSetLimitAtom = atom<number>(5);
