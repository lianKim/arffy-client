import { atom } from 'jotai';

export const pageToMoveAtom = atom<number>(0);
export const currentNoticeIdAtom = atom<number | null>(null);
export const pageSetOffsetAtom = atom<number>(0);
export const pageSetLimitAtom = atom<number>(5);

export const titleAtom = atom<string>('');
export const contentAtom = atom<string>('');
export const topFixedAtom = atom(false);
export const imageUrlsAtom = atom<string[]>([]);
