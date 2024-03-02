import React, { useCallback, useEffect, useState } from 'react';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import styled from 'styled-components';
import Select from '../@common/atoms/Select/Select';
import { REFUND_REASONS, REFUND_REASONS_OBJ } from '../../lib/constants/refund';
import { useAtom } from 'jotai';
import { refundProductListAtom } from '../../store/adminOrderDetailAtom';
import Input from '../@common/atoms/Input/Input';
import Button from '../@common/atoms/Button/Button';
import { ObjectIndexable } from '../../@types/common';
import { RefundableProduct } from '../../@types/adminOrder';

interface RefundableOrderElementProps {
  productInfo: RefundableProduct;
}

export default React.memo(function RefundableOrderElement({
  productInfo,
}: RefundableOrderElementProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const [refundReason, setRefundReason] = useState<string>('');
  const [refundDetailReason, setRefundDetailReason] = useState<string>('');

  const [, setRefundProductList] = useAtom(refundProductListAtom);

  const handleSelectItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      // 반품할 상품 목록에서 제거
      setRefundProductList((prev) => {
        const nextRefundProductList = [...prev].filter(
          (product) => product.ordersDetailId !== productInfo.ordersDetailId,
        );
        return nextRefundProductList;
      });
      setIsChecked(false);
      setIsAdded(false);
      setRefundReason('');
      setRefundDetailReason('');
    }
  };

  const handleRefundDetailReasonChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRefundDetailReason(e.target.value);
  };

  const handleAddButtonClick = useCallback(() => {
    if (isChecked && !!refundReason) {
      setRefundProductList((prev) => [
        ...prev,
        {
          ordersDetailId: productInfo.ordersDetailId,
          cancelReason: (REFUND_REASONS_OBJ as ObjectIndexable)[refundReason],
          cancelReasonContent: refundDetailReason,
        },
      ]);
      setIsAdded(true);
    }
  }, [isChecked, refundReason, refundDetailReason]);

  useEffect(() => {
    if (isChecked && !!refundReason) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [refundReason]);

  return (
    <>
      <Container>
        <CheckBoxInput type="checkbox" onChange={handleSelectItem} />
        <ProductInfo
          productName={productInfo.productName || 'dddddddd'}
          price={productInfo.originPrice}
          discountPrice={productInfo.discountPrice}
          thumbnail={productInfo.thumbnail || ''}
          productId={productInfo.productId}
          key={productInfo.ordersDetailId}
        />
        {isChecked && (
          <RefundReasonInputsContainer>
            {isAdded && !!refundReason ? (
              <>
                <div>
                  <RefundReasonLabel>반품 사유 : </RefundReasonLabel>
                  <RefundReason>{refundReason}</RefundReason>
                </div>
                {!!refundDetailReason && (
                  <div>
                    <RefundReasonLabel>반품 상세 사유 : </RefundReasonLabel>
                    <RefundReason>{refundDetailReason}</RefundReason>
                  </div>
                )}
              </>
            ) : (
              <>
                <Select
                  label="반품 사유를 선택해주세요"
                  options={REFUND_REASONS}
                  value={refundReason}
                  onSetValue={setRefundReason}
                  status="default"
                />
                <Input
                  placeholder="반품 상세 사유를 입력해주세요"
                  value={refundDetailReason}
                  onChange={handleRefundDetailReasonChange}
                />
                <Button
                  label="추가"
                  onClick={handleAddButtonClick}
                  active={buttonActive}
                />
              </>
            )}
          </RefundReasonInputsContainer>
        )}
      </Container>
    </>
  );
});

const Container = styled.div`
  width: 100%;
  margin-bottom: 28px;
`;

const CheckBoxInput = styled.input`
  margin: 0;
`;

const RefundReasonInputsContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RefundReasonLabel = styled.span`
  font-weight: 500;
`;

const RefundReason = styled.span`
  color: var(--color-orange);
`;
