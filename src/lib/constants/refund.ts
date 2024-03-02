export const REFUND_REASONS = ['단순변심', '배송지연', '상품파손', '기타'];

export const REFUND_REASONS_OBJ = {
  상품파손: 'PRODUCT_DAMAGE',
  단순변심: 'CHANGE_MIND',
  배송지연: 'DELAY_DELIVERY',
  기타: 'ETC',
};

export const REFUND_REASONS_OBJ2 = {
  PRODUCT_DAMAGE: '상품파손',
  CHANGE_MIND: '단순변심',
  DELAY_DELIVERY: '배송지연',
  ETC: '기타',
};

export const REFUND_STATUS_OBJ = {
  PROGRESS: '반품처리중',
  COMPLETE: '반품완료',
};
