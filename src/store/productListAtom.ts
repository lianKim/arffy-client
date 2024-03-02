import { atom } from 'jotai';

export const categoryAtom = atom<string>('all');
export const pageToMoveAtom = atom<number>(0);
export const pageSetOffsetAtom = atom<number>(0);
export const pageSetLimitAtom = atom<number>(5);
