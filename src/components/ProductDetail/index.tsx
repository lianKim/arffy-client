import React, { useCallback, useState } from 'react';
import Description from './Description';
import Details from './Details';
import TitleAndPrice from './TitleAndPrice';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { checkHasToken } from '../../utils/auth';
import AddedToCartModal from './AddedToCartModal';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import ProductImageCarousel from './ProductImageCarousel';
import ProductQnAList from './ProductQnAList';
import { useProductDetailData } from '../../lib/apis/productAPIs';
import { CustomError, ValidationError } from '../../utils/customErrors';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useCartAddMutation } from '../../lib/apis/cartAPIs';
import { useOrderNumberGetMutation } from '../../lib/apis/paymentAPIs';

export default React.memo(function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productInfo } = useProductDetailData(Number(productId));

  const { mutateAsync: addItemToCart } = useCartAddMutation();

  const { mutateAsync: getInfoForOrder } = useOrderNumberGetMutation();

  const validateProduct = () => {
    if (!productInfo?.data.quantity) {
      throw new ValidationError('상품의 재고가 부족합니다.');
    }
  };

  // 장바구니 담기 버튼 onClick 함수
  const handleAddToCartClick = useCallback(async () => {
    if (!productInfo?.data?.productId) return;

    try {
      validateProduct();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    const hasToken = checkHasToken();
    if (hasToken) {
      // 장바구니 추가 mutation
      const res = await addItemToCart(Number(productId));
      if (res) setIsModalOpen(true);
    }
  }, [productId, location]);

  // 바로 구매하기 버튼 onClick 함수
  const handleBuyRightNowClick = useCallback(async () => {
    if (!productInfo?.data?.productId) return;

    try {
      validateProduct();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    const infoForOrder = await getInfoForOrder(String(productId));
    navigate('/payment', { state: { datas: infoForOrder } });
  }, [productInfo?.data.productId]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {isModalOpen && <AddedToCartModal onCloseModal={closeModal} />}
      {!!productInfo?.data && (
        <>
          <Container>
            <ProductImageCarousel imageUrlList={productInfo.data.imageUrls} />
            <ContentContainer>
              <ContentDetailsContainer>
                <TitleAndPrice
                  title={productInfo.data.productName}
                  price={productInfo.data.price}
                  discountPrice={productInfo.data.discountPrice}
                  soldOut={productInfo.data.quantity < 1}
                />
                <Description description={productInfo.data.description} />
                <Details
                  period={productInfo.data.period}
                  country={productInfo.data.country}
                  width={productInfo.data.width}
                  depth={productInfo.data.depth}
                  height={productInfo.data.height}
                  minLineHeight={productInfo.data.minLineHeight}
                  maxLineHeight={productInfo.data.maxLineHeight}
                  material={productInfo.data.material}
                  condition={productInfo.data.condition}
                />
              </ContentDetailsContainer>
              {productInfo.data.quantity > 0 ? (
                <ButtonsPairContainer>
                  <ButtonsPair
                    primaryButtonText="바로 구매하기"
                    secondaryButtonText="장바구니 담기"
                    onClickPrimaryButton={handleBuyRightNowClick}
                    onClickSecondaryButton={handleAddToCartClick}
                    active={productInfo.data.quantity > 0}
                  />
                </ButtonsPairContainer>
              ) : (
                <SoldOutBox type="button" disabled>
                  품절
                </SoldOutBox>
              )}
            </ContentContainer>
          </Container>
          <ProductQnAList productId={productInfo.data.productId} />
        </>
      )}
    </>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 128px - 64px);
    gap: 40px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    width: calc(90vw - ((100vh - 128px - 64px) * 0.66666667));
    height: 100%;
  }
`;

const ContentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8vh;

  @media screen and (min-width: 1024px) {
    height: calc(100% - 37px - 40px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 16px;
      background-color: var(--color-white);
    }

    &::-webkit-scrollbar:hover {
      background-color: var(--color-orange);
    }

    &::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: var(--color-gray100);
      border-radius: 16px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-yellow);
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

const ButtonsPairContainer = styled.div`
  margin-top: 48px;
`;

const SoldOutBox = styled.button`
  display: none;
  width: 100%;
  height: 37px;
  border: 1px solid var(--color-gray200);
  color: var(--color-gray300);
  line-height: 37px;
  margin-top: 48px;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;
