import { atom } from 'jotai';

export const categoryAtom = atom<string>('');
export const productNameAtom = atom<string>('');
export const priceAtom = atom<string>('');
export const discountRateAtom = atom<string>('');
export const periodAtom = atom<string>('');
export const countryAtom = atom<string>('');
export const widthAtom = atom<string>('');
export const depthAtom = atom<string>('');
export const heightAtom = atom<string>('');
export const minLineHeightAtom = atom<string>('');
export const maxLineHeightAtom = atom<string>('');
export const materialAtom = atom<string>('');
export const conditionAtom = atom<string>('');
export const descriptionAtom = atom<string>('');
export const imageFilesAtom = atom<File[]>([]);
export const imageUrlsAtom = atom<string[]>([]);
export const thumbnailFileAtom = atom<File[]>([]);
export const thumbnailUrlAtom = atom<string[]>([]);
export const productImageTypeAtom = atom<'PRODUCT'>('PRODUCT');

// API 호출 시 blob에 넣을 데이터 obj (이미지 제외한 모든 정보)
export const productInfoAtom = atom((get) => {
  const category = String(get(categoryAtom))?.toUpperCase();
  const productName = String(get(productNameAtom));
  const price = String(Number(get(priceAtom)));
  const discountRate = String(Number(get(discountRateAtom)));
  const period = String(get(periodAtom));
  const country = String(get(countryAtom));
  const width = String(Number(get(widthAtom)));
  const depth = String(Number(get(depthAtom)));
  const height = String(Number(get(heightAtom)));
  const minLineHeight = String(Number(get(minLineHeightAtom)));
  const maxLineHeight = String(Number(get(maxLineHeightAtom)));
  const material = String(get(materialAtom));
  const condition = String(get(conditionAtom));
  const description = String(get(descriptionAtom));
  const imageType = get(productImageTypeAtom);

  return {
    category,
    productName,
    price,
    discountRate,
    period,
    country,
    width,
    depth,
    height,
    minLineHeight,
    maxLineHeight,
    material,
    condition,
    description,
    imageType,
  };
});

// 유효성 검사 에러 메세지
export const categoryErrorMessageAtom = atom<string>('');
export const productNameErrorMessageAtom = atom<string>('');
export const priceErrorMessageAtom = atom<string>('');
export const discountRateErrorMessageAtom = atom<string>('');
export const periodErrorMessageAtom = atom<string>('');
export const countryErrorMessageAtom = atom<string>('');
export const widthErrorMessageAtom = atom<string>('');
export const depthErrorMessageAtom = atom<string>('');
export const heightErrorMessageAtom = atom<string>('');
export const minLineHeightErrorMessageAtom = atom<string>('');
export const maxLineHeightErrorMessageAtom = atom<string>('');
export const materialErrorMessageAtom = atom<string>('');
export const conditionErrorMessageAtom = atom<string>('');
export const descriptionErrorMessageAtom = atom<string>('');
export const imagesErrorMessageAtom = atom<string>('');
export const thumbnailErrorMessageAtom = atom<string>('');

// 수정 시 기존 이미지들 id 배열
export const existingImageIdsAtom = atom<number[]>([]);
// 삭제할 이미지들 id 배열
export const deleteImageIdsAtom = atom(<number[]>[]);
