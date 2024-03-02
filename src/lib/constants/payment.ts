const {
  VITE_CLIENT_BASE_URL,
  VITE_USER_SERVER_BASE_URL,
  VITE_KAKAO_PAY_CID,
  VITE_TOSS_PAY_CID,
  VITE_KG_INICIS_CID,
} = import.meta.env;

export const STORE_ID = 'imp43803540';

export const M_REDIRECT_URL = `${VITE_CLIENT_BASE_URL}/payment/result`;
export const CONFIRM_URL = `${VITE_USER_SERVER_BASE_URL}/api/v1/payment/confirm`;

export const PG_LIST = [
  {
    value: 'kakaopay',
    label: '카카오페이',
  },
  // {
  //   value: 'tosspay',
  //   label: '토스페이',
  // },
  // {
  //   value: 'html5_inicis',
  //   label: '신용카드',
  // },
];

export const CID_LIST = {
  kakaopay: VITE_KAKAO_PAY_CID,
  // tosspay: VITE_TOSS_PAY_CID,
  // html5_inicis: VITE_KG_INICIS_CID,
};

export const METHOD_FOR_CARD = [
  {
    value: 'card',
    label: '신용카드',
  },
];

export const QUOTAS = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
];

export const QUOTAS_FOR_INICIS_AND_KCP = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
  {
    value: 2,
    label: '2개월',
  },
  {
    value: 3,
    label: '3개월',
  },
  {
    value: 4,
    label: '4개월',
  },
  {
    value: 5,
    label: '5개월',
  },
  {
    value: 6,
    label: '6개월',
  },
];
