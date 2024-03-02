import { atom } from 'jotai';
import { CID_LIST } from '../lib/constants/payment';
import { ObjectIndexable } from '../@types/common';

export const ordersIdAtom = atom<number>(0);
export const merchantUidAtom = atom<string>('');
export const paymentAmountAtom = atom<number>(0);

export const termsCheckedAtom = atom<boolean>(false);

export const pgAtom = atom<string>('');
export const payMethodAtom = atom<string>('card');
export const impCidAtom = atom<string>(
  (get) => (CID_LIST as ObjectIndexable)[get(pgAtom)],
);

export const receiverNameAtom = atom<string>('');
export const receiverMobileAtom = atom<string>('');
export const receiverPostcodeAtom = atom<string>('');
export const receiverAddressAtom = atom<string>('');
export const receiverAddressDetailAtom = atom<string>('');
export const profileUpdateCheckedAtom = atom<boolean>(false);
export const deliveryRequestContentAtom = atom<string>('');

export const receiverNameErrorMessageAtom = atom<string>('');
export const receiverMobileErrorMessageAtom = atom<string>('');
export const receiverAddressErrorMessageAtom = atom<string>('');
export const receiverAddressDetailErrorMessageAtom = atom<string>('');

export const deliveryRequestErrorMessageAtom = atom<string>('');

// 배송지 정보로 회원정보 수정 요청 시 전달할 데이터
export const profileUpdateDataAtom = atom((get) => {
  const name = get(receiverNameAtom);
  const phoneNumber = get(receiverMobileAtom);
  const address = get(receiverAddressAtom);
  const addressDetail = get(receiverAddressDetailAtom);
  const postCode = get(receiverPostcodeAtom);

  return {
    name,
    phoneNumber,
    address,
    addressDetail,
    postCode,
  };
});

export const paymentMethodAtom = atom<string>('');

// 주문번호 사전등록 요청 시 전달할 데이터
export const orderNumberUploadDatasAtom = atom((get) => {
  // orderInfo
  const merchant_uid = get(merchantUidAtom);
  const amount = get(paymentAmountAtom);
  // receiverInfo
  const receiverName = get(receiverNameAtom);
  const receiverPhoneNumber = get(receiverMobileAtom);
  const deliveryPostCode = get(receiverPostcodeAtom);
  const deliveryAddress = get(receiverAddressAtom);
  const deliveryAddressDetail = get(receiverAddressDetailAtom);
  const deliveryRequestContent = get(deliveryRequestContentAtom);

  return {
    orderInfo: {
      merchant_uid,
      amount,
    },
    receiverInfo: {
      receiverName,
      receiverPhoneNumber,
      deliveryPostCode,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryRequestContent,
    },
  };
});
