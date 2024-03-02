import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  categoryAtom,
  categoryErrorMessageAtom,
  conditionAtom,
  conditionErrorMessageAtom,
  countryAtom,
  countryErrorMessageAtom,
  depthAtom,
  depthErrorMessageAtom,
  descriptionAtom,
  descriptionErrorMessageAtom,
  discountRateAtom,
  discountRateErrorMessageAtom,
  heightAtom,
  heightErrorMessageAtom,
  imageFilesAtom,
  imageUrlsAtom,
  imagesErrorMessageAtom,
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
  thumbnailFileAtom,
  thumbnailUrlAtom,
  widthAtom,
  widthErrorMessageAtom,
} from '../../store/adminProductUploadAtom';
import { toast } from 'react-toastify';
import PriceInput from './PriceInput';
import ProductNameInput from './ProductNameInput';
import CategorySelect from './CategorySelect';
import DiscountRateInput from './DiscountRateInput';
import PeriodInput from './PeriodInput';
import CountryInput from './CountryInput';
import SizeInputs from './SizeInputs';
import LineHeightInputs from './LineHeightInputs';
import MaterialInputs from './MaterialInputs';
import ConditionTextArea from './ConditionTextArea';
import DescriptionTextArea from './DescriptionTextArea';
import ProductImagesUploader from './ProductImagesUploader';
import ThumbnailUploader from './ThumbnailUploader';
import styled from 'styled-components';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import MutatingSpinner from '../@common/molecules/Spinner/MutatingSpinner';
import { useIsMutating } from '@tanstack/react-query';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { useProductUploadMutation } from '../../lib/apis/adminProductAPIs';

export default React.memo(function AdminProductUpload() {
  const navigate = useNavigate();
  const [buttonsActive, setButtonsActive] = useState<boolean>(false);
  const isMutating = useIsMutating();

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
    imagesErrorMessageAtom,
  );
  // useMutation 상품 등록
  const { mutateAsync: postProduct, isSuccess } = useProductUploadMutation();

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

    // 이미지 개수 체크
    if (imageFiles.length < 1) {
      throw new ValidationError('이미지를 첨부해주세요.');
    } else if (imageFiles.length > 20) {
      throw new ValidationError('이미지는 최대 20장까지 첨부 가능합니다.');
    }

    // 썸네일 유무 체크
    if (thumbnailFile.length < 1) {
      throw new ValidationError('썸네일을 등록해주세요.');
    } else if (thumbnailFile.length > 1) {
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

  // 등록 버튼에 전달할 onClick 함수
  const handleSubmitButtonClick = useCallback(async () => {
    // 모든 입력 값 trim 처리 (앞뒤 공백 제거)
    TrimAllValues();

    // 입력 값 유효성 검사
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    const productId = await postProduct(
      {
        productDto: productInfo,
        productImages: imageFiles,
        thumbnail: thumbnailFile[0],
      },
      {
        onSuccess: () => {
          resetAllValues();
        },
      },
    );

    // 헤당 상품 디테일 조회 페이지로 이동
    if (productId) {
      navigate(`/admin/product/${productId}`);
    } else {
      console.error('product id를 찾을 수 없습니다.');
    }
  }, [productInfo, imageFiles.length, thumbnailFile[0]]);

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
      imageFiles.length > 0 &&
      thumbnailFile.length > 0
    ) {
      setButtonsActive(true);
    } else {
      setButtonsActive(false);
    }
  }, [category, productName, price, discountRate, period, country, width, depth, height, material, condition, description, imageFiles.length, thumbnailFile.length]);

  // 언마운트 시 모든 값 초기화
  useEffect(() => {
    return () => {
      setTimeout(resetAllValues, 1000);
    };
  }, []);

  return (
    <>
      <MutatingSpinner />
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
        <ThumbnailUploader />
        <ProductImagesUploader />
        <ButtonsPair
          onClickPrimaryButton={handleSubmitButtonClick}
          active={buttonsActive}
        />
      </Container>
    </>
  );
});

interface ContainerProps {
  loading?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media screen and (min-width: 1024px) {
    width: 30vw;
    margin: 0 auto;
  }
`;
