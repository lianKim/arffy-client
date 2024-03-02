import { atom } from 'jotai';
import { AdminProductRefundDetail } from '../@types/adminOrder';

export const ordersIdAtom = atom<string>('0');
export const merchantUidAtom = atom<string>('');

// 반품 가능한 상품 목록 조회
export const refundableOrdersIdAtom = atom<number>(0);
export const refundableMerchantUidAtom = atom<string>('');

// 반품 요청
export const refundProductListAtom = atom<AdminProductRefundDetail[]>([]);
export const refundRequestErrorMessageAtom = atom<string>('');
