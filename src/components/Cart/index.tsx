import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import Button from '../@common/atoms/Button/Button';
import TotalPaymentAmount from '../@common/organisms/TotalPaymentAmount/TotalPaymentAmount';
import {
  useCartData,
  useCartItemDeleteMutation,
  useCartItemListDeleteMutation,
} from '../../lib/apis/cartAPIs';
import { CustomError, ValidationError } from '../../utils/customErrors';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';
import { useOrderNumberGetMutation } from '../../lib/apis/paymentAPIs';

export default React.memo(function Cart() {
  const navigate = useNavigate();

  // 장바구니 조회 API
  const { data: cartInfo } = useCartData();
  // 아이템 개별 삭제 요청 API
  const { mutate: removeCartItem } = useCartItemDeleteMutation();
  // 아이템 전체 삭제 요청 API
  const { mutate: removeAll } = useCartItemListDeleteMutation();
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const { mutateAsync: getInfoForOrder } = useOrderNumberGetMutation();

  const handleRemoveCartItem = useCallback((cartId: number) => {
    removeCartItem(cartId);
  }, []);

  const handleRemoveAllCartItems = () => {
    if (!cartInfo?.data?.cartList?.length) return;

    const cartIdList: number[] = [];
    cartInfo.data.cartList.forEach((item, idx) => {
      cartIdList[idx] = item.cartId;
    });

    removeAll(cartIdList);
  };

  // 유효성 검사
  const validateForOrderAll = () => {
    if (!cartInfo?.data?.cartList?.length) {
      throw new ValidationError('장바구니에 담긴 상품이 없습니다.');
    }

    for (let i = 0; i < cartInfo.data.cartList.length; i++) {
      const stock = cartInfo.data.cartList[i].quantity > 0;
      if (!stock) {
        throw new ValidationError('재고가 부족한 상품이 포함되어 있습니다.');
      }
    }
  };

  // 유효성 검사
  const validateForOrderEach = (stock: boolean) => {
    if (!stock) {
      throw new ValidationError('상품의 재고가 부족합니다.');
    }
  };

  // 주문 페이지로 이동 (전체 주문)
  const handleBuyAll = useCallback(async () => {
    try {
      validateForOrderAll();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    if (!cartInfo?.data?.cartList?.length) return;

    const productIds = cartInfo.data.cartList
      .map((item) => item.productId)
      .join(',');
    const infoForOrder = await getInfoForOrder(productIds);

    navigate('/payment', { state: { datas: infoForOrder } });
  }, [cartInfo?.data.cartList]);

  // 주문 페이지로 이동 (개별 주문)
  const handleBuyEachItem = useCallback(
    async (productId: number, stock: boolean) => {
      try {
        validateForOrderEach(stock);
      } catch (err) {
        if (err instanceof CustomError) {
          toast.error(err.message);
        }

        throw err;
      }

      const infoForOrder = await getInfoForOrder(String(productId));
      navigate('/payment', { state: { datas: infoForOrder } });
    },
    [],
  );

  useEffect(() => {
    if (!cartInfo?.data?.cartList?.length) return;

    if (cartInfo.data.cartList.length < 1) {
      setButtonActive(false);
      return;
    }

    for (let i = 0; i < cartInfo.data.cartList.length; i++) {
      const stock = cartInfo.data.cartList[i].quantity > 0;
      if (!stock) {
        setButtonActive(false);
        return;
      }
    }
    setButtonActive(true);
  }, [cartInfo]);

  return (
    <div>
      <div>
        <CartTitle>
          <div>
            <span>Cart</span>
            <NumberOfItems>
              {cartInfo?.data?.cartList?.length || '0'}
            </NumberOfItems>
          </div>
          <ResetButton
            type="button"
            onClick={handleRemoveAllCartItems}
            className={cartInfo?.data?.cartList?.length ? '' : 'inactive'}
            disabled={!cartInfo?.data?.cartList?.length}
          >
            전체삭제
          </ResetButton>
        </CartTitle>
      </div>
      {cartInfo?.data && cartInfo.data.cartList?.length > 0 ? (
        <>
          <ProductsContainer>
            {cartInfo.data.cartList.map((item) => (
              <ProductInfo
                productId={item.productId}
                productName={item.productName}
                price={item.price}
                discountPrice={item.discountPrice}
                thumbnail={item.thumbnail}
                soldOut={item.quantity < 1}
                key={item.productId}
              >
                <ButtonsPairContainer>
                  <ButtonsPair
                    primaryButtonText="주문"
                    secondaryButtonText="삭제"
                    onClickPrimaryButton={() =>
                      handleBuyEachItem(item.productId, item.quantity > 0)
                    }
                    onClickSecondaryButton={() =>
                      handleRemoveCartItem(item.cartId)
                    }
                    active={item.quantity > 0}
                  />
                </ButtonsPairContainer>
              </ProductInfo>
            ))}
          </ProductsContainer>
          <TotalPaymentAmount
            totalPrice={cartInfo.data.totalPrice}
            totalDiscountedPrice={cartInfo.data.totalDiscountPrice}
          />
          <Button
            label="주문하기"
            onClick={handleBuyAll}
            primary
            active={buttonActive}
            marginTop="32px"
          />
        </>
      ) : (
        <NoContentMessage message="장바구니가 비어 있습니다.">
          <Link to="/product">
            <Button label="쇼핑하러 가기" active primary />
          </Link>
        </NoContentMessage>
      )}
    </div>
  );
});

const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  letter-spacing: normal;
  font-weight: var(--weight-semi-bold);
`;

const NumberOfItems = styled.span`
  margin-left: 6px;
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: var(--font-x-micro);
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  background: var(--color-navy);
  color: var(--color-white);
  border-radius: 50%;
`;

const ResetButton = styled.button`
  background: none;
  border: 0;
  color: var(--color-gray300);
  padding: 2px 0 2px 4px;
  font-size: var(--font-x-micro);
  font-weight: var(--weight-semi-bold);
  line-height: var(--font-micro);

  &.inactive {
    color: var(--color-gray100);
  }
`;

const ProductsContainer = styled.div`
  margin-bottom: 72px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonsPairContainer = styled.div`
  @media screen and (min-width: 1024px) {
    width: 300px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
