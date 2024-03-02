import { atom } from 'jotai';
import { AdminNoticePreview } from '../@types/adminNotice';

export const pageToMoveAtom = atom<number>(0);
export const currentNoticeIdAtom = atom<number | null>(null);
export const pageSetOffsetAtom = atom<number>(0);
export const pageSetLimitAtom = atom<number>(5);

// (상단 고정 X) 공지사항 목록
export const normalNoticeListAtom = atom<AdminNoticePreview[]>([]);
// (상단 고정 O) 공지사항 목록
export const topNoticeListAtom = atom<AdminNoticePreview[]>([]);

export const titleAtom = atom<string>('');
export const contentAtom = atom<string>('');
export const topFixedAtom = atom<boolean>(false);
export const imageUrlsAtom = atom<string[]>([]);
