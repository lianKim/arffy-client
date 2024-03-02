import React from 'react';
import styled from 'styled-components';
import { insertCommas } from '../../../../utils/handleCommas';

interface TotalPaymentAmountProps {
  totalPrice: number;
  totalDiscountedPrice: number;
  isPaid?: boolean;
}

export default React.memo(function TotalPaymentAmount({
  totalPrice,
  totalDiscountedPrice,
  isPaid,
}: TotalPaymentAmountProps) {
  return (
    <Container>
      <div>
        <Row>
          <span>총 주문 금액</span>
          <Price>
            <span>KRW {insertCommas(totalPrice)}</span>
          </Price>
        </Row>
        <Row>
          <span>총 할인 금액</span>
          <Price>
            <span>KRW {insertCommas(totalPrice - totalDiscountedPrice)}</span>
          </Price>
        </Row>
        <Row>
          <span>배송비</span>
          <span>무료</span>
        </Row>
      </div>
      <FinalPrice>
        <Divider />
        <Row>
          <span>{isPaid ? '총 결제 금액' : '결제 예정 금액'}</span>
          <Price>
            <span>KRW {insertCommas(totalDiscountedPrice)}</span>
          </Price>
        </Row>
      </FinalPrice>
    </Container>
  );
});

const Container = styled.div`
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray100);
  margin-bottom: 18px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Price = styled.div`
  letter-spacing: normal;

  & span {
    margin-left: 4px;
  }
`;

const FinalPrice = styled.div`
  margin-top: 18px;
  font-weight: var(--weight-semi-bold);
`;
