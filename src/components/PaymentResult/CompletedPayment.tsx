import React from 'react';
import styled from 'styled-components';
import { AiOutlineCheckCircle } from '@react-icons/all-files/ai/AiOutlineCheckCircle';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import { useNavigate } from 'react-router-dom';

interface CompletedPaymentProps {
  merchantUid: string | null;
}

export default function CompletedPayment({
  merchantUid,
}: CompletedPaymentProps) {
  const navigate = useNavigate();

  const handleNavOrderListClick = () => {
    navigate('/my/order/list');
  };

  const handleKeepShoppingClick = () => {
    navigate('/product');
  };

  return (
    <Container>
      <PaymentResult>
        <StyledCheckIcon />
        <ResultMessage>결제가 완료되었습니다.</ResultMessage>
        <OrderNumber>{merchantUid}</OrderNumber>
      </PaymentResult>
      <ButtonsPair
        primaryButtonText="더 둘러보기"
        secondaryButtonText="주문내역 조회"
        onClickPrimaryButton={handleKeepShoppingClick}
        onClickSecondaryButton={handleNavOrderListClick}
        active
      />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 60%;

  @media screen and (min-width: 1024px) {
    width: 30%;
  }
`;

const PaymentResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledCheckIcon = styled(AiOutlineCheckCircle)`
  font-size: 36px;
  color: var(--color-navy);
`;

const ResultMessage = styled.div`
  margin-top: 16px;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 13px;
  color: var(--color-navy);
`;
const OrderNumber = styled.div`
  font-size: var(--font-micro);
  color: var(--color-gray200);
  width: 100%;
  white-space: pre-line;
  line-height: calc(var(--font-small) * 1.3);
  text-align: center;
`;
