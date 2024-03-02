import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useCallback, useState } from 'react';
import {
  categoryAtom,
  categoryErrorMessageAtom,
  conditionAtom,
  conditionErrorMessageAtom,
  countryAtom,
  countryErrorMessageAtom,
  deleteImageIdsAtom,
  depthAtom,
  depthErrorMessageAtom,
  descriptionAtom,
  descriptionErrorMessageAtom,
  discountRateAtom,
  discountRateErrorMessageAtom,
  existingImageIdsAtom,
  heightAtom,
  heightErrorMessageAtom,
  imageFilesAtom,
  imagesErrorMessageAtom,
  imageUrlsAtom,
  materialAtom,
  materialErrorMessageAtom,
  maxLineHeightAtom,
  maxLineHeightErrorMessageAtom,
  minLineHeightAtom,
  minLineHeightErrorMessageAtom,
  periodAtom,
  periodErrorMessageAtom,
  priceAtom,
  priceErrorMessageAtom,
  productInfoAtom,
  productNameAtom,
  productNameErrorMessageAtom,
  thumbnailErrorMessageAtom,
  thumbnailFileAtom,
  thumbnailUrlAtom,
  widthAtom,
  widthErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import { toast } from 'react-toastify';
import CategorySelect from '../AdminProductUpload/CategorySelect';
import ProductNameInput from '../AdminProductUpload/ProductNameInput';
import PriceInput from '../AdminProductUpload/PriceInput';
import DiscountRateInput from '../AdminProductUpload/DiscountRateInput';
import PeriodInput from '../AdminProductUpload/PeriodInput';
import CountryInput from '../AdminProductUpload/CountryInput';
import SizeInputs from '../AdminProductUpload/SizeInputs';
import LineHeightInputs from '../AdminProductUpload/LineHeightInputs';
import MaterialInputs from '../AdminProductUpload/MaterialInputs';
import ConditionTextArea from '../AdminProductUpload/ConditionTextArea';
import DescriptionTextArea from '../AdminProductUpload/DescriptionTextArea';
import { productIdAtom } from '../../store/adminProductDetailAtom';
import ProductImagesModifier from './ProductImagesModifier';
import ThumbnailModifier from './ThumbnailModifier';
import styled from 'styled-components';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import {
  useAdminProductDetailData,
  useProductModifyMutation,
} from '../../lib/apis/adminProductAPIs';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default function AdminProductModify() {
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);

  const [category, setCategory] = useAtom(categoryAtom);
  const [productName, setProductName] = useAtom(productNameAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [discountRate, setDiscountRate] = useAtom(discountRateAtom);
  const [period, setPeriod] = useAtom(periodAtom);
  const [country, setCountry] = useAtom(countryAtom);
  const [width, setWidth] = useAtom(widthAtom);
  const [depth, setDepth] = useAtom(depthAtom);
  const [height, setHeight] = useAtom(heightAtom);
  const [minLineHeight, setMinLineHeight] = useAtom(minLineHeightAtom);
  const [maxLineHeight, setMaxLineHeight] = useAtom(maxLineHeightAtom);
  const [material, setMaterial] = useAtom(materialAtom);
  const [condition, setCondition] = useAtom(conditionAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [imageFiles, setImageFiles] = useAtom(imageFilesAtom);
  const [imageUrls, setImageUrls] = useAtom(imageUrlsAtom);
  const [thumbnailFile, setThumbnailFile] = useAtom(thumbnailFileAtom);
  const [thumbnailUrl, setThumbnailUrl] = useAtom(thumbnailUrlAtom);

  // 전달해야 할 데이터들이 모두 담긴 Obj
  const [productInfo] = useAtom(productInfoAtom);

  // 유효성 검사(입력값 유무) 에러 메세지
  const [categoryErrorMessage, setCategoryErrorMessage] = useAtom(
    categoryErrorMessageAtom,
  );
  const [productNameErrorMessage, setProductNameErrorMessage] = useAtom(
    productNameErrorMessageAtom,
  );
  const [priceErrorMessage, setPriceErrorMessage] = useAtom(
    priceErrorMessageAtom,
  );
  const [discountRateErrorMessage, setDiscountRateErrorMessage] = useAtom(
    discountRateErrorMessageAtom,
  );
  const [periodErrorMessage, setPeriodErrorMessage] = useAtom(
    periodErrorMessageAtom,
  );
  const [countryErrorMessage, setCountryErrorMessage] = useAtom(
    countryErrorMessageAtom,
  );
  const [widthErrorMessage, setwidthErrorMessage] = useAtom(
    widthErrorMessageAtom,
  );
  const [depthErrorMessage, setDepthErrorMessage] = useAtom(
    depthErrorMessageAtom,
  );
  const [heightErrorMessage, setHeightErrorMessage] = useAtom(
    heightErrorMessageAtom,
  );
  const [minLineHeightErrorMessage, setMinLineHeightErrorMessage] = useAtom(
    minLineHeightErrorMessageAtom,
  );
  const [maxLineHeightErrorMessage, setMaxLineHeightErrorMessage] = useAtom(
    maxLineHeightErrorMessageAtom,
  );
  const [materialErrorMessage, setMaterialErrorMessage] = useAtom(
    materialErrorMessageAtom,
  );
  const [conditionErrorMessage, setConditionErrorMessage] = useAtom(
    conditionErrorMessageAtom,
  );
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useAtom(
    descriptionErrorMessageAtom,
  );
  const [imagesErrorMessage, setImagesErrorMessage] = useAtom(
    imagesErrorMessageAtom,
  );
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useAtom(
    thumbnailErrorMessageAtom,
  );
  // 수정 시 불러올 product id
  const [productId, setProductId] = useAtom(productIdAtom);
  // 수정 시 불러올 기존 데이터
  // const { data: productDetail } = useAtomValue(adminProductDetailAtom);
  const { data: productDetail } = useAdminProductDetailData(Number(productId));

  const [existingImageIds, setExistingImageIds] = useAtom(existingImageIdsAtom);
  const [deleteImageIds, setDeleteImageIds] = useAtom(deleteImageIdsAtom);
  // 상품 수정 useMutation
  const { mutate: updateProduct } = useProductModifyMutation();

  // 모든 값 앞뒤 공백 제거해주는 함수
  const TrimAllValues = () => {
    setCategory((prev) => prev?.trim());
    setProductName((prev) => prev?.trim());
    setPrice((prev) => prev?.trim());
    setDiscountRate((prev) => prev?.trim());
    setPeriod((prev) => prev?.trim());
    setCountry((prev) => prev?.trim());
    setWidth((prev) => prev?.trim());
    setDepth((prev) => prev?.trim());
    setHeight((prev) => prev?.trim());
    setMinLineHeight((prev) => prev?.trim());
    setMinLineHeight((prev) => prev?.trim());
    setMaterial((prev) => prev?.trim());
    setCondition((prev) => prev?.trim());
    setDescription((prev) => prev?.trim());
  };

  // API 호출 전 마지막 유효성 검사
  const validateValues = () => {
    // 미입력 값 유무 체크
    if (!category) {
      throw new ValidationError('카테고리를 선택해주세요.');
    }

    if (!productName) {
      throw new PropertyRequiredError('상품명');
    }

    if (!price) {
      throw new PropertyRequiredError('가격');
    }

    if (!discountRate) {
      throw new PropertyRequiredError('할인율');
    }

    if (!period) {
      throw new PropertyRequiredError('생산 시기');
    }

    if (!country) {
      throw new PropertyRequiredError('생산국');
    }

    if (maxLineHeight && !minLineHeight) {
      throw new PropertyRequiredError('줄 길이 최솟값');
    }

    if (minLineHeight && !maxLineHeight) {
      throw new PropertyRequiredError('줄 길이 최댓값');
    }

    if (!material) {
      throw new PropertyRequiredError('상품의 소재');
    }

    if (!condition) {
      throw new PropertyRequiredError('상품의 컨디션');
    }

    if (!description) {
      throw new PropertyRequiredError('상세 설명');
    }

    // 이미지 개수 체크 (url이 기존, file이 새로 추가된 이미지)
    if (imageUrls.length < 1) {
      throw new ValidationError('이미지를 첨부해주세요.');
    } else if (imageUrls.length > 20) {
      throw new ValidationError('이미지는 최대 20장까지 첨부 가능합니다.');
    }

    // 썸네일 유무 체크
    if (thumbnailUrl.length < 1) {
      throw new ValidationError('썸네일을 등록해주세요.');
    } else if (thumbnailUrl.length > 1) {
      throw new ValidationError('썸네일은 하나만 등록 가능합니다.');
    }

    // width, depth, height 중 2개 이상 입력되었는지 검사
    if ((!width && !depth) || (!height && !depth) || (!width && !height)) {
      throw new ValidationError(
        '사이즈는 width, depth, height 중 2개 이상 입력해주세요.',
      );
    }
    // lineHeight min, max 값 대소 비교 검사
    if (Number(minLineHeight) > Number(maxLineHeight)) {
      throw new ValidationError(
        '줄 길이 최솟값은 최댓값보다 작거나 같은 값을 입력해주세요.',
      );
    }

    if (priceErrorMessage) {
      throw new ValidationError(priceErrorMessage);
    }

    if (discountRateErrorMessage) {
      throw new ValidationError(discountRateErrorMessage);
    }
  };

  const resetAllValues = useCallback(() => {
    setCategory('');
    setProductName('');
    setPrice('');
    setDiscountRate('');
    setPeriod('');
    setCountry('');
    setWidth('');
    setDepth('');
    setHeight('');
    setMinLineHeight('');
    setMaxLineHeight('');
    setMaterial('');
    setCondition('');
    setDescription('');
    setImageFiles([]);
    setImageUrls([]);
    setThumbnailFile([]);
    setThumbnailUrl([]);
    // 에러메세지
    setCategoryErrorMessage('');
    setProductNameErrorMessage('');
    setPriceErrorMessage('');
    setDiscountRateErrorMessage('');
    setPeriodErrorMessage('');
    setCountryErrorMessage('');
    setwidthErrorMessage('');
    setDepthErrorMessage('');
    setHeightErrorMessage('');
    setMinLineHeightErrorMessage('');
    setMaxLineHeightErrorMessage('');
    setMaterialErrorMessage('');
    setConditionErrorMessage('');
    setDescriptionErrorMessage('');
    setImagesErrorMessage('');
    setThumbnailErrorMessage('');
  }, []);

  // 등록(수정) 버튼에 전달할 onClick 함수
  const handleSubmitButtonClick = useCallback(async () => {
    if (!productId) return;

    // 모든 입력 값 trim 처리 (앞뒤 공백 제거)
    TrimAllValues();

    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    updateProduct(
      {
        productDto: {
          ...productInfo,
          productId: productId,
          deleteImages: deleteImageIds,
        },
        productImages: imageFiles,
        thumbnail: thumbnailFile[0],
      },
      {
        onSuccess: () => {
          resetAllValues();
          return (window.location.href = `${VITE_CLIENT_BASE_URL}/admin/product`);
        },
      },
    );
  }, [productInfo, deleteImageIds.length, imageFiles.length, thumbnailFile[0]]);

  // 기존 값 value 초기값으로 설정
  useEffect(() => {
    if (!productDetail?.data) return;

    // 카테고리 앞글자만 대문자로 남겨두고, 나머지는 소문자로 변환
    const convertedCategory =
      productDetail.data.category.slice(0, 1) +
      productDetail.data.category.slice(1).toLowerCase();
    setCategory(convertedCategory);
    setProductName(productDetail.data.productName);
    setPrice(String(productDetail.data.price));
    setDiscountRate(String(productDetail.data.discountRate));
    setPeriod(productDetail.data.period);
    setCountry(productDetail.data.country);
    if (!!productDetail.data.width) setWidth(String(productDetail.data.width));
    if (!!productDetail.data.depth) setDepth(String(productDetail.data.depth));
    if (!!productDetail.data.height)
      setHeight(String(productDetail.data.height));
    if (!!productDetail.data.minLineHeight)
      setMinLineHeight(String(productDetail.data.minLineHeight));
    if (productDetail.data.maxLineHeight)
      setMaxLineHeight(String(productDetail.data.maxLineHeight));
    setMaterial(productDetail.data.material);
    setCondition(productDetail.data.condition);
    setDescription(productDetail.data.description);
    // images
    const productImageIds = productDetail.data.imageList.map(
      (imageInfo) => imageInfo.imageId,
    );
    const productImageUrls = productDetail.data.imageList.map(
      (imageInfo) => imageInfo.imageUrl,
    );
    setExistingImageIds(productImageIds);
    setImageUrls(productImageUrls);
    setImageFiles([]);
    // thumbnail
    setThumbnailUrl([productDetail.data.thumbnail]);
    setThumbnailFile([]);
  }, [productDetail?.data.productId]);

  useEffect(() => {
    if (
      category &&
      productName &&
      price &&
      discountRate &&
      period &&
      country &&
      ((width && depth) || (width && height) || (depth && height)) &&
      material &&
      condition &&
      description &&
      imageUrls.length > 0 &&
      thumbnailUrl.length > 0
    ) {
      setButtonsActive(true);
    } else {
      setButtonsActive(false);
    }
  }, [
    category,
    productName,
    price,
    discountRate,
    period,
    country,
    width,
    depth,
    height,
    material,
    condition,
    description,
    imageUrls.length,
    thumbnailFile.length,
    thumbnailUrl.length,
  ]);

  // 언마운트 시 데이터 초기화
  useEffect(() => {
    return () => {
      setTimeout(resetAllValues, 1000);
    };
  }, []);

  return (
    <>
      <MutatingSpinner />
      {productDetail?.data && (
        <Container>
          <CategorySelect />
          <ProductNameInput />
          <PriceInput />
          <DiscountRateInput />
          <PeriodInput />
          <CountryInput />
          <SizeInputs />
          <LineHeightInputs />
          <MaterialInputs />
          <ConditionTextArea />
          <DescriptionTextArea />
          <ProductImagesModifier />
          <ThumbnailModifier />
          <ButtonsPair
            primaryButtonText="수정"
            onClickPrimaryButton={handleSubmitButtonClick}
            active={buttonsActive}
          />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media screen and (min-width: 1024px) {
    width: 30vw;
    margin: 0 auto;
  }
`;
