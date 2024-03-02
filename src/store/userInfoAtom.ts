import { atom } from 'jotai';

export const userNameAtom = atom<string>('');
export const phoneNumberAtom = atom<string>('');
export const addressAtom = atom<string>('');
export const addressDetailAtom = atom<string>('');
export const postCodeAtom = atom<string>('');

// 에러 메세지
export const userNameErrorMessageAtom = atom<string>('');
export const phoneNumberErrorMessageAtom = atom<string>('');
export const addressErrorMessageAtom = atom<string>('');
export const addressDetailErrorMessageAtom = atom<string>('');

// 사용자 정보 수정 요청할 때 전송할 데이터
export const userInfoDataAtom = atom((get) => {
  const name = get(userNameAtom);
  const phoneNumber = get(phoneNumberAtom);
  const address = get(addressAtom);
  const addressDetail = get(addressDetailAtom);
  const postCode = get(postCodeAtom);

  return {
    name,
    phoneNumber,
    address,
    addressDetail,
    postCode,
  };
});
