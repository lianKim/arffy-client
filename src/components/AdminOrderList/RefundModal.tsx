import React, { useCallback, useEffect } from 'react';
import Modal from '../@common/molecules/Modal/Modal';
import { useAtom } from 'jotai';
import {
  refundProductListAtom,
  refundRequestErrorMessageAtom,
} from '../../store/adminOrderDetailAtom';
import RefundableOrderElement from './RefundableOrderElement';
import styled from 'styled-components';
import {
  useAdminRefundableProductListData,
  useRefundRequestMutation,
} from '../../lib/apis/adminOrderAPIs';

interface RefundModalProps {
  ordersId: number;
  merchantUid: string;
  onCloseModal: () => void;
}

export default React.memo(function RefundModal({
  ordersId,
  merchantUid,
  onCloseModal,
}: RefundModalProps) {
  const { data: refundableProductList } = useAdminRefundableProductListData(
    ordersId,
    merchantUid,
  );

  const [refundProductList, setRefundProductList] = useAtom(
    refundProductListAtom,
  );
  const [errorMessage, setErrorMessage] = useAtom(
    refundRequestErrorMessageAtom,
  );
  const { mutate: requestRefund } = useRefundRequestMutation();

  // 반품 신청 mutation
  const handleRefundRequest = useCallback(() => {
    if (refundProductList.length < 1) {
      setErrorMessage('선택된 항목이 없습니다');
      return;
    } else {
      requestRefund(
        {
          ordersId,
          merchantUid,
          refundProductList,
        },
        {
          onSettled: () => {
            onCloseModal();
          },
        },
      );
    }
  }, [ordersId, merchantUid, refundProductList]);

  useEffect(() => {
    if (refundProductList && refundProductList.length > 0) {
      setErrorMessage('');
    }
  }, [refundProductList?.length]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setRefundProductList([]);
        setErrorMessage('');
      }, 1000);
    };
  }, []);

  return (
    <Modal onClose={onCloseModal} onClickPrimaryButton={handleRefundRequest}>
      <>
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {!!refundableProductList?.data &&
          refundableProductList.data.length > 0 &&
          refundableProductList.data.map((info) => (
            <RefundableOrderElement productInfo={info} key={info.productId} />
          ))}
      </>
    </Modal>
  );
});

const ErrorMessage = styled.div`
  margin: 14px 0;
  color: var(--color-orange);
  font-weight: 500;
`;
