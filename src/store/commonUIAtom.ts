import { atom } from 'jotai';

// 사이드바(메뉴/관리자 메뉴) open/close 관리용
export const sideBarOpenAtom = atom<boolean>(false);
export const adminSideBarOpenAtom = atom<boolean>(false);

// 관리자 인증 여부
export const isAdminAtom = atom<boolean>(false);
