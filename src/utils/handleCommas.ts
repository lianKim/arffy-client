// 천 단위마다 콤마 삽입
export const insertCommas = (price: number | string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 콤마 제거
export const removeCommas = (price: string) => {
  return price.replace(/,/g, '');
};
