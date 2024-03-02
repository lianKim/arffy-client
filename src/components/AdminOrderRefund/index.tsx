import React, { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { refundProductListAtom } from '../../store/adminOrderDetailAtom';
import RefundableOrderElement from './RefundableOrderElement';
import styled from 'styled-components';
import {
  useAdminRefundableProductListData,
  useRefundRequestMutation,
} from '../../lib/apis/adminOrderAPIs';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import { CustomError, ValidationError } from '../../utils/customErrors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';

interface RefundModalProps {
  ordersId: number;
  merchantUid: string;
}

export default React.memo(function AdminOrderRefund({
  ordersId,
  merchantUid,
}: RefundModalProps) {
  const navigate = useNavigate();

  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const { data: refundableProductList } = useAdminRefundableProductListData(
    ordersId,
    merchantUid,
  );

  const [refundProductList, setRefundProductList] = useAtom(
    refundProductListAtom,
  );

  const { mutate: requestRefund } = useRefundRequestMutation();

  const validateValues = () => {
    if (refundProductList.length < 1) {
      throw new ValidationError('선택된 항목이 없습니다.');
    }
  };

  // 반품 신청 mutation
  const handleRefundRequest = useCallback(() => {
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    requestRefund(
      {
        ordersId,
        merchantUid,
        refundProductList,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      },
    );
  }, [ordersId, merchantUid, refundProductList]);

  useEffect(() => {
    if (!!refundProductList?.length) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [refundProductList?.length]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setRefundProductList([]);
      }, 1000);
    };
  }, []);

  return (
    <Container>
      <PageTitle title="반품처리" subTitle={merchantUid} />
      {!!refundableProductList?.data &&
        refundableProductList.data.length > 0 && (
          <RefundableOrderElementList>
            {refundableProductList.data.map((info) => (
              <RefundableOrderElement productInfo={info} key={info.productId} />
            ))}
          </RefundableOrderElementList>
        )}
      <ButtonsPair
        primaryButtonText="반품처리"
        secondaryButtonText="이전으로"
        onClickPrimaryButton={handleRefundRequest}
        active={buttonActive}
      />
    </Container>
  );
});

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    width: 30vw;
    margin: 0 auto;
  }
`;

const RefundableOrderElementList = styled.div`
  margin-bottom: 48px;
`;
